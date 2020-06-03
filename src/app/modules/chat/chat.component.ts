import { Component, OnInit, AfterViewInit, Inject, OnDestroy, ViewChild, ViewChildren, ElementRef, Renderer2} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { SocketService } from './service/socket.service';
import { Event } from './model/event';
import { Message } from './model/message';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { SignInDialog } from './chat-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { filter, timestamp } from 'rxjs/operators';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { MatListItem, MatList } from '@angular/material/list';
import { Observable, Subject } from 'rxjs';

/*
  FormControl:  it tracks the value and validity status of an angular form control. It matches to a HTML form control like an input.
  FormGroup: it tracks the value and validity state of a FormBuilder instance group. It aggregates the values of each child FormControl into one object, using the name of each form control as the key. It calculates its status by reducing the statuses of its children. If one of the controls inside a group is invalid, the entire group becomes invalid.
  FormArray: is a variation of FormGroup. The main difference is that its data gets serialized as an array, as opposed to being serialized as an object in case of FormGroup. This might be especially useful when you don’t know how many controls will be present within the group, like in dynamic forms.
  FormBuilder: is a helper class that creates FormGroup, FormControl and FormArray instances for us. It basically reduces the repetition and clutter by handling details of form control creation for you.

  https://angular-templates.io/tutorials/about/angular-forms-and-validations
*/

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit, OnDestroy {
  // private user: User;
  private messages: Message[] = [];
  private users: any = [];
  private interactions = [];                          //unique user interactions with its messages (list of users)
                                                      //Alternative method: instead of storing interactions in arrays,
                                                      //   append a mat-list-item with its messages?
  private userMessageInput: string;                   // holds user's message input supplied from mat-form-field
  private messageSubscription: any;                   //TODO: is this needed? Redundant?

  private lastUserTyped: string;
  private interactionCount: number = -1;              //# of unique interactions

  private userNameForm: FormGroup;
  // private showSignInPage: boolean = true;             //boolean page displaying sign in page
  private userName: string = "";

  private dialogRef;

  private signInForm: FormGroup; 
  private chatForm: FormGroup;

  private routerSubscription;

  @ViewChild("isTypingItem", { static : false, read:ElementRef})    // with static turned off ViewChild reference gets updated by Angular when the ngIf directive Changes
  private isTypingItemElemRef: ElementRef;

  private isTyping : boolean = false;
  private timeout : any = undefined

  constructor(private socketService: SocketService, 
              public dialog: MatDialog,
              private router: Router,
              private elementRef: ElementRef, private renderer: Renderer2, @Inject(DOCUMENT) private document) { 
  }

  //TODO: is this needed?
  ngOnDestroy(): void {
    this.socketService.disconnectSocket();
  }

  ngOnInit() {
    console.log("[Chat Component] onInit");

    this.openSignInDialog();

    // listen for router changes; if user navigates out of chat component, close the dialog then disconnect any socket connections established
    this.routerSubscription = this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationStart),
        filter(() => !!this.dialogRef)
      )
      .subscribe(() => {
        this.dialogRef.close({
        username: "",
        dialogType: "navigating"
      });

      this.socketService.disconnectSocket();
    });

  }

  ngAfterViewInit(): void {


  }

  timeoutFunction(socketService: SocketService) {
    console.log("NO TYPING for 3 Seconds!!");
    this.isTyping = false;
    console.log("socketService: " + socketService);
    socketService.sendEvent(Event.NOT_TYPING, "");      
    /*
    TypeError: Cannot read property 'sendEvent' of undefined
    at push../app/modules/chat/chat.component.ts.ChatComponent.timeoutFunction
    */
  }


  /**
   * TODO BUG: when invoking setTimeout(this.timeoutFunction, 3000), timeoutFunction() above has socketService undefined.
   * Temp Solution: Use arrow notation instead of this.timeoutFunction
   * @param event 
   */
  keyPress(event: KeyboardEvent) : void {
    console.log("TYPING!!");


    if(this.isTyping == false) {
      this.isTyping = true;

      if(this.socketService != undefined) {
        this.socketService.sendEvent(Event.TYPING, "");
        this.timeout = setTimeout(() => {
          console.log("NO TYPING for 3 Seconds!!");
          this.isTyping = false;
          console.log("socketService: " + this.socketService);
          this.socketService.sendEvent(Event.NOT_TYPING, "");
        }, 3000);    //TODO: need key press to wait until socketService is initialized. Solution Observable/Promise?
      }

    }
    else {
      if(this.socketService != undefined) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          console.log("NO TYPING for 3 Seconds!!");
          this.isTyping = false;
          console.log("socketService: " + this.socketService);
          this.socketService.sendEvent(Event.NOT_TYPING, "");
        }, 3000);
      }
    }
  }

  /**
   * Open Sign In Dialog which allows user to join a chat session
   */
  openSignInDialog() {
    console.log("opening SignInDialog");
    this.dialogRef = this.dialog.open(SignInDialog, {
      hasBackdrop: false,
      disableClose: true,            //disable closing when clicking outside of dialog
      data: {userName: this.userName}
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if(result.dialogType == 'new') {

        console.log('The dialog was closed');
        console.dir(result)
        this.userName = result.username;

        this.initIoConnection();


      }
      if(result.dialogType == "navigating") {
        console.log("Closing Dialog");
        this.socketService.disconnectSocket();
      }
    });
  }

  /**
    Change User Name
  */
  private changeUserName(newUserName: string): void {
    this.userName = newUserName;

    this.socketService.sendEvent(Event.RENAME, {
      previousUserName : this.userName,
      newUserName : newUserName
    });
  }

  /**
    Initialize IO connection to Chat Server and start listening to incoming requests
  */
  private initIoConnection(): void {

    //1) Initialize IO connection
    this.socketService.initSocket(this.userName);

    //2) Listen to incoming events from server

    this.socketService.onEvent(Event.CONNECT)
      .subscribe((data:string) => {
        console.log('client connected to server chat');

        //Let chat server know of your username
        this.socketService.sendEvent(Event.JOINED, this.userName);
      });

    this.socketService.onEvent(Event.CURRENT_USERS)
      .subscribe((currentUsers:string[]) => {
        console.log('[CURRENT_USERS] refreshing current list of users');

        this.users = this.users.concat(currentUsers);
      });
  
    this.messageSubscription = this.socketService.onMessage()
      .subscribe((message: Message) => {

        // console.log("message: ");
        // console.dir(message);

        console.log("lastUserTyped vs message.from.name >: " + this.lastUserTyped+ ": " +message.from)
        if(this.lastUserTyped == undefined || this.lastUserTyped != message.from) {
          this.interactionCount += 1;
          console.log("Starting new interaction");
          this.interactions.push ({
            user: message.from,
            timestamp: message.time,
            messages: []
          });

          console.log("interactionCount: " + this.interactionCount );
          console.log("interactions: ");
          console.dir(this.interactions);
          console.dir(this.interactions[this.interactionCount]);

          this.interactions[this.interactionCount].messages.push(message.content)
        }
        else {
          console.log("same interaction: " + this.interactionCount);
          console.dir(this.interactions);
          console.dir(this.interactions[this.interactionCount]);
          this.interactions[this.interactionCount].messages.push(message.content)
        }

        //Keep track of last person typed
        this.lastUserTyped = message.from;
        console.log("[onMessage] lastUserTyped was : " + this.lastUserTyped);
    });

    this.socketService.onEvent(Event.JOINED)
      .subscribe((data:string) => {
        console.log('new user ,' + data + ', joined');
        this.users.push(data);
    });
    
    this.socketService.onEvent(Event.LEFT)
      .subscribe((data:string) => {
        this.users = this.users.filter(e => e !== data)
        
        //TODO: add notification

        console.log(data + ' disconnected from chat');
    });

    this.socketService.onEvent(Event.RENAME)
      .subscribe(() => {
        console.log('Renaming');
        this.socketService.sendEvent(Event.RENAME, this.userName);
    });

    this.socketService.onGetUsers()
      .subscribe((data: string[]) => {
          this.users = data;
        	console.log("data: " + data);
    });

    this.socketService.onEvent(Event.TYPING)
      .subscribe((data : string) => {
        console.log("typing : " + data);

        const child = this.renderer.createElement("p");
        const text = this.renderer.createText(data)

        this.renderer.appendChild(child, text);

        console.log("isTypingItemElemRef: " + this.isTypingItemElemRef);

        this.renderer.setProperty(this.isTypingItemElemRef.nativeElement, 'textContent', data );
    });

    this.socketService.onEvent(Event.NOT_TYPING).subscribe((data:string) => {
      this.renderer.setProperty(this.isTypingItemElemRef.nativeElement, 'textContent', "" );
    });

    this.socketService.onEvent(Event.DISCONNECTED).subscribe(() => {
      console.log("SERVER DISCONNECTED");

      this.socketService.disconnectSocket();
      this.users = [];
    }) 
  }

  //Invoked from chat component html
  public sendMessageToServer(message: string): void {
    console.log("[sendMessage] message: " + message);
    if (!message) {
      return;
    }
  
    this.socketService.sendMessage({
        from: this.userName,
        content: message,
        action: null,
        time:null
    });
  }
}
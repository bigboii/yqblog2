import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { SocketService } from './service/socket.service';
import { Action } from './model/action';
import { Event } from './model/event';
import { Message } from './model/message';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { SignInDialog } from './chat-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { filter, timestamp } from 'rxjs/operators';

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
export class ChatComponent implements OnInit {
  private action = Action;
  // private user: User;
  private messages: Message[] = [];
  private interactions = [];
  private messageContent: string;
  private ioConnection: any;

  private lastUserTyped: string;
  private interactionCount: number = -1;

  private userNameForm: FormGroup;
  private showSignInPage: boolean = true;             //boolean page displaying sign in page
  private userName: string = "";

  private dialogRef;

  private signInForm: FormGroup; 
  private chatForm: FormGroup;

  private routerSubscription;


  // getting a reference to the overall list, which is the parent container of the list items
  //@ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

  // getting a reference to the items/messages within the list
  //@ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(private socketService: SocketService, 
              public dialog: MatDialog,
              private router: Router) { 
  }

  ngOnInit() {
    console.log("[Chat Component] onInit");
    this.openSignInDialog();
    // this.activatedRoute.url.subscribe( url => { 
    //   console.log("currently in path: " + url);
    //   console.dir(url);
    //   if(url[0].path == "chat") {
    //     this.openSignInDialog();
    //   }
    //   if(url[0].path != "chat") {
    //     console.log("not in chat page: " + url[0].path);
    //     this.socketService.disconnectSocket();
    //   }
    // });

    // listen for router's changes and close the dialog and disconnect socket
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

  openSignInDialog() {
    console.log("opening SignInDialog");
    this.dialogRef = this.dialog.open(SignInDialog, {
      hasBackdrop: false,
      disableClose: true,            //disable closing when clicking outside of dialog
      data: {userName: this.userName}
    });

    this.dialogRef.afterClosed().subscribe(result => {
      if(result.dialogType == 'new') {

        this.initIoConnection();
        console.log('The dialog was closed');
        console.dir(result)
        this.userName = result.username;
        this.showSignInPage = false;
        this.sendNotification('',Action.JOINED);
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
    this.sendNotification({previousUserName: newUserName}, Action.RENAME);
  }

  /**
    Socket IO
  */
  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        // this.messages.push(message);
        console.log("message: ");
        console.dir(message);

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

    //subscribe to socketIO's default CONNECT event
    this.socketService.onEvent(Event.CONNECT)
      .subscribe(() => {
        console.log('connected');
      });
    
    //subscribe to socketIO's default DISCONNECT event
    this.socketService.onEvent(Event.DISCONNECT)
      .subscribe(() => {
        console.log('disconnected');
      });
  }

  // private disconnectSocket(): void {
  //   this.socketService.disconnectSocket();
  // }

  public sendMessage(message: string): void {

    console.log("[sendMessage] message: " + message);
    if (!message) {
      return;
    }
    
    this.socketService.send({
      from: this.userName,
      content: message,
      action: null,
      time:null
    });

    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      console.log("this.user.name: " + this.userName);
      console.dir(this.userName);
      message = {
        from: this.userName,
        content: this.userName + ' has joined the chat',
        action: action,
        time:null
      }
    } else if (action === Action.RENAME) {
      message = {
        from: this.userName,
        action: action,
        content: {
          username: this.userName,
          previousUsername: params.previousUsername
        },
        time:null
      };
    }

    this.socketService.send(message);
  }

}
import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { SocketService } from './service/socket.service';
import { Action } from './model/action';
import { Event } from './model/event';
import { User } from './model/user';
import { Message } from './model/message';

import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

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
  action = Action;
  user: User;
  messages: Message[] = [];
  messageContent: string;
  ioConnection: any;

  userNameForm: FormGroup;
  showSignInPage: boolean = true;             //boolean page displaying sign in page
  userName: string = "";

  // userNameValidation;

  dialogRef;

  signInForm: FormGroup; 
  chatForm: FormGroup;


  // getting a reference to the overall list, which is the parent container of the list items
  //@ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

  // getting a reference to the items/messages within the list
  //@ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(private socketService: SocketService, 
              private formBuilder: FormBuilder,
              public dialog: MatDialog) { 
    // this.signInForm=formBuilder.group({
    //   "userNameValidation": new FormControl('', [Validators.required])
    // });
  }

  ngOnInit() {
    console.log("[Chat Component] onInit");

    this.dialogRef = this.dialog.open(SignInDialog, {
      // width: '400px',
      // height: '600px',
      hasBackdrop: false,
      disableClose: true,            //disable closing when clicking outside of dialog
      data: {userName: this.userName}
    });


    this.dialogRef.afterClosed().subscribe(result => {

      
      if(result.dialogType == 'new') {

        this.initIoConnection();
        console.log('The dialog was closed');
        this.userName = result;
        console.log("signing in with result: " + result);
        console.log("signing in as " + this.userName);
        //Sign in
        // this.user = new User(this.userName);
        this.user = new User();
        this.user.name = this.userName;
        this.showSignInPage = false;
        this.sendNotification('',Action.JOINED);
      }
    });
  }

  ngAfterViewInit() {



  }

  // public validateAndSubmitUserName() {
  //   console.log("userNameValidation: ");
  //   console.dir(this.signInForm.controls.userNameValidation);
  //   if(this.signInForm.controls.userNameValidation.valid) {
  //     console.log("username not validated");
  //     this.dialogRef.close();
  //   }
  // }

  //get userNameForm() { return this.userNameForm.controls; }

  /**
    Change User Name
  */
  private changeUserName(newUserName: string): void {
    this.user.name = newUserName;
    this.sendNotification({previousUserName: newUserName}, Action.RENAME);
  }

  /**
    Socket IO
  */
  private initIoConnection(): void {
    this.socketService.initSocket();

    this.ioConnection = this.socketService.onMessage()
      .subscribe((message: Message) => {
        this.messages.push(message);
                console.log("[onMessage] messages: " + message);
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

  public sendMessage(message: string): void {

    console.log("[sendMessage] message: " + message);
    if (!message) {
      return;
    }
    
    this.socketService.send({
      from: this.user.name,
      content: message,
      action: null
    });


    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    console.log("userName is : " + this.user );
    console.dir(this.user);
    console.log(this.userName);

    if (action === Action.JOINED) {
      message = {
        from: this.user.name,
        content: ' has joined the chat',
        action: action
      }
    } else if (action === Action.RENAME) {
      message = {
        from: this.user,
        action: action,
        content: {
          username: this.user.name,
          previousUsername: params.previousUsername
        }
      };
    }

    this.socketService.send(message);
  }

}


/*
  Dialog
*/

export interface DialogData {
  userName: string;
}

@Component({
  selector: 'chat-dialog',
  templateUrl: 'chat-dialog.component.html',
})
export class SignInDialog {

  public userNameValidation = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<SignInDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(dialogType: string): void {
    this.dialogRef.close({
      username: this.data.userName,
      dialogType: dialogType
    });
  }

}
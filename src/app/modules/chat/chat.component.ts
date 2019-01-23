import { Component, OnInit } from '@angular/core';
import { SocketService } from './service/socket.service';
import { Action } from './model/action';
import { Event } from './model/event';
import { User } from './model/user';
import { Message } from './model/message';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';


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

  // getting a reference to the overall list, which is the parent container of the list items
  //@ViewChild(MatList, { read: ElementRef }) matList: ElementRef;

  // getting a reference to the items/messages within the list
  //@ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

  constructor(private socketService: SocketService, 
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userNameForm = this.formBuilder.group({
      'userName': ['', Validators.required]
    });

    this.initIoConnection();
  }

  /**
    Sign In Page
  */
  private onSignIn(): void {

    let name : string = this.userNameForm.value.userName;
    //console.dir(this.userNameForm.value);
    //console.log(this.userNameForm.value.userName);
    console.log(name + " has signed in");
    //this.showSignInPage = false;
    this.user = new User(name);
    this.showSignInPage = false;
    this.sendNotification('',Action.JOINED);
  }

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
      from: this.user,
      content: message,
      action: null
    });


    this.messageContent = null;
  }

  public sendNotification(params: any, action: Action): void {
    let message: Message;

    if (action === Action.JOINED) {
      message = {
        from: this.user,
        content: this.user.name + ' has joined the chat',
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

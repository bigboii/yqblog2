import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Observer } from 'rxjs';
import { Message } from '../model/message';
import { Event } from '../model/event';

import { environment } from './../../../../environments/environment';

import * as socketIo from 'socket.io-client';

// const SERVER_URL = 'http://localhost:3000/#/chat';
const SERVER_URL = '192.168.1.177:3000/#/chat'          //TODO: don't hard code this; use a configuration file


@Injectable(  {
    providedIn: 'root'    //make ThemeService a singleton
  })
export class SocketService {

  private socket;

  public initSocket(userName: string): void {
    console.log("initSocket(), userName: " + userName);
    this.socket = socketIo(environment.chatServerUrl);
  }

  public disconnectSocket(): void {
    this.socket.close();
    console.log("[Client] Disconnecting from chat server");
  }

  public sendMessage(message: Message): void {
    this.socket.emit('MESSAGE', message);
  }

  /**
   * 
   * @param command : any value from Event Enum
   * @param data    : can be null
   */
  public sendEvent(command:Event, data:any) : void {

    this.socket.emit(command.toString(), data);
  }

  //Return an observable that listens to incoming messages from server
  public onMessage(): Observable<Message> {
    return new Observable<Message> (observer => {
            this.socket.on('MESSAGE', (data: Message) => observer.next(data));
        });
  }

  //Return observable that listens to incoming specified event
  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
        this.socket.on(event.toString(), (data:any) => observer.next(data));
    });
  }

  //Return observable that listens to incoming specified event
  public onGetUsers(): Observable<string[]> {
    return new Observable<string[]>(observer => {
        this.socket.on("GET_USERS", (data: string[]) => observer.next(data));
    });
  }

}

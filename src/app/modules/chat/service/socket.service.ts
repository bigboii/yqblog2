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

  public initSocket(): void {
    this.socket = socketIo(environment.chatServerUrl);
  }

  public disconnectSocket(): void {
    this.socket.close();
    console.log("[Client] Disconnecting from chat server");
  }

  public send(message: Message): void {
    this.socket.emit('message', message);
  }

  public onMessage(): Observable<Message> {
    return new Observable<Message> (observer => {
            this.socket.on('message', (data: Message) => observer.next(data));
        });
  }

  public onEvent(event: Event): Observable<any> {
    return new Observable<Event>(observer => {
        this.socket.on(event, () => observer.next());
    });
  }
}

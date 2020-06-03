import { User } from './user';
import { Event } from '../model/event';

/**
 * Message contract between client and chat server
 */

export class Message {

  from: string;
  content: any;
  action: Event;
  time: string;

/*
  constructor(private from: User, private content: string) 
  {
    this.from = from;
    this.content = content;

  }
  */
}
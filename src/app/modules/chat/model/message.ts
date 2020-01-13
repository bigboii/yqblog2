import { User } from './user';
import { Action } from './action';

/**
 * Message contract between client and chat server
 */

export class Message {

  from: string;
  content: any;
  action: Action;
  time: string;

/*
  constructor(private from: User, private content: string) 
  {
    this.from = from;
    this.content = content;

  }
  */
}
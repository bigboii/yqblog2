import { User } from './user';
import { Action } from './action';

export class Message {

  from: User;
  content: any;
  action: Action;
  time: any;

/*
  constructor(private from: User, private content: string) 
  {
    this.from = from;
    this.content = content;

  }
  */
}
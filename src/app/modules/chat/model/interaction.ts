import { User } from './user';
import { Message } from './message';

export class Interaction {

  user: User;
  timestamp: any;
  messages: Message[];

/*
  constructor(private from: User, private content: string) 
  {
    this.from = from;
    this.content = content;

  }
  */
}
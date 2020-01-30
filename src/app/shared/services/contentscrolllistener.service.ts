import { Injectable, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject , fromEvent,  AsyncSubject, Subject, Observable, ConnectableObservable } from 'rxjs';
import { map, tap, startWith, pairwise, share, publish, filter, exhaustMap, multicast, isEmpty } from 'rxjs/operators';

/** 
 * 
 * Listens to scrolling event within mat-side-nav content (when windows:scroll isn't available)
 * 
 * - An Observable by default is unicast. Unicasting means that each subscribed observer owns an independent execution of the Observable.
 * - The main reason to use Subjects is to multicast. A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters:
 *      they maintain a registry of many listeners. 
 * - fromEvent(), by default, returns an observable that broadcasts to many subscribers (like a subject). It does this because the constructor calls publish().refCount().
*/

interface ScrollPosition {
  sH: number;
  sT: number;
  cH: number;
};

const DEFAULT_SCROLL_POSITION: ScrollPosition = {
  sH: 0,
  sT: 0,
  cH: 0
};

@Injectable({
  providedIn: 'root'     //make ContentScrollListenerService a singleton
})
export class ContentScrollListenerService {

  private sidenavContentElem;
  private contentScrollEventSubject = new Subject(); // observes observable sequences
  private multicast;
  private subscriptions = [];

  @Input() public scrollCallback;
  @Input() public testInput: string;

  constructor(@Inject(DOCUMENT) private document: Document) 
  {

  }

  /** 
   * Should be initialized once by component that hosts mat-sidenav-content (app.component.html)
  */
  public startListeningToScrolling() {

    //Method 1: Subject, register Scroll Event on sidenav-content
    this.sidenavContentElem = this.document.querySelector('mat-sidenav-content');
    this.document.querySelector('mat-sidenav-content')
                                 .addEventListener('scroll', this.onContentScroll.bind(this));

    //Method 2, Multicast Observable: Register Scroll Event
    this.multicast = fromEvent(this.sidenavContentElem, 'scroll');

    // this.multicast = (fromEvent(this.sidenavContentElem, 'scroll')).pipe(
    //     map((e: any): ScrollPosition => ({                   //get scrollHeight, scrollTop, and clientHeight per each scroll
    //       sH: e.target.scrollHeight,
    //       sT: e.target.scrollTop,
    //       cH: e.target.clientHeight
    //     }))
    //     // ,tap(val => console.log(`After MAP: ${val}`))    //enable for debugging
    //   );

    console.log("finished initializing contentScrollEventSubject");
  }

  public getScrollEventSubject() {
    if(this.contentScrollEventSubject == undefined) {
      this.startListeningToScrolling();
    }

    return this.contentScrollEventSubject;
  }

  public getMulticast(caller: String) {
    return this.multicast;
  }


  public onContentScroll(e) {
    this.contentScrollEventSubject.next(e);
  }
}
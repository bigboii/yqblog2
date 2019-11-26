import { Injectable, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject ,  fromEvent } from 'rxjs';
import { map, tap, startWith, pairwise, filter, exhaustMap } from 'rxjs/operators';

/** 
 * 
 * Listens to scrolling event within mat-side-nav content (when windows:scroll isn't available)
 * 
 * BehaviorSubject vs Observable(x)
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
  private contentScrollEventSource;
  private scrollEvent;

  @Input() public scrollCallback;
  @Input() public testInput: string;

  constructor(@Inject(DOCUMENT) private document: Document) 
  {

  }

  /** 
   * Should be initialized once by component that hosts mat-sidenav-content (app.component.html)
  */
  public startListeningToScrolling() {

    //Register Scroll Event on sidenav-content
    this.sidenavContentElem = document.querySelector('mat-sidenav-content');
    console.log("[contentscrolllistener] sidenavContentElem: " + this.sidenavContentElem);
    console.dir(this.sidenavContentElem);
    this.contentScrollEventSource = fromEvent(this.sidenavContentElem, 'scroll');

    //Stream Scroll Event: map to ScrollPosition
    this.scrollEvent = this.contentScrollEventSource.pipe(
      map((e: any): ScrollPosition => ({                   //get scrollHeight, scrollTop, and clientHeight per each scroll
        sH: e.target.scrollHeight,
        sT: e.target.scrollTop,
        cH: e.target.clientHeight
      }))
      // ,tap(val => console.log(`After MAP: ${val}`))    //enable for debugging
    );

    // this.scrollEvent.startWith([DEFAULT_SCROLL_POSITION, DEFAULT_SCROLL_POSITION]) 
  }

  public getScrollEventForSubscription() {
    return this.scrollEvent;
  }
}
import { Injectable, Inject, Input } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject ,  fromEvent } from 'rxjs';
import { map, pairwise, filter, exhaustMap } from 'rxjs/operators';

/** 
 * 
 * Listens to scrolling event within mat-side-nav content (when windows:scroll isn't available)
*/

//https://hackernoon.com/naive-infinite-scroll-in-reactive-programming-using-rxjs-observables-4a605d3146e8
//https://codeburst.io/angular-2-simple-infinite-scroller-directive-with-rxjs-observables-a989b12d4fb1
//https://netbasal.com/rxjs-six-operators-that-you-must-know-5ed3b6e238a0

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

  public sidenavContentElem;
  public contentScrollEventSource;
  public scrollEvent;
  public requestOnScroll;
  public currentScrollPosition : ScrollPosition;

  @Input() public scrollCallback;
  @Input() public testInput: string;

  constructor(@Inject(DOCUMENT) private document: Document) 
  {
    
  }

  /**
  *
  */

  listenForScrolling () {

    //Initialize local variables
    this.sidenavContentElem = document.querySelector('mat-sidenav-content');

    //Register Scroll Event
    this.contentScrollEventSource = fromEvent(this.sidenavContentElem, 'scroll');

    //Stream Scroll Event
    this.scrollEvent = this.contentScrollEventSource.pipe(
      map((e: any): ScrollPosition => ({                   //get scrollHeight, scrollTop, and clientHeight per each scroll
        sH: e.target.scrollHeight,
        sT: e.target.scrollTop,
        cH: e.target.clientHeight
      })));
  }
}
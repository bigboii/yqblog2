import { Component, OnInit, AfterViewInit } from '@angular/core';
import { revealParallaxAnimation, slideUpFadeIn } from '../../../../../shared/animations';

@Component({
  selector: 'parallax-home',
  templateUrl: './parallax-home.component.html',
  styleUrls: ['./parallax-home.component.scss'],
  animations: [ revealParallaxAnimation, slideUpFadeIn ]
})
export class ParallaxHomeComponent implements OnInit, AfterViewInit {

  public parallaxHeight: number;
  public state: boolean = false;  //animation state

  constructor() { }

  ngOnInit() {
    let viewportHeight: number = window.innerHeight;

    if(document.documentElement.clientHeight >= 600) {    //Desktop Screen
      this.parallaxHeight = viewportHeight - 64;
    }
    else {                                                //Mobile Screen
      this.parallaxHeight = viewportHeight - 56;
    }
  }

  ngAfterViewInit() {
    console.log("[PARALLAXHOME] start: " + this.state);
    this.state=true;
    console.log("[PARALLAXHOME] start: " + this.state);
  }

  textTransitionStarted(event) {
    console.log("[Parallax Home] slideInFadeIn Route Transition Starting");
  }

  /*
    Callback when route transition animation ends
    @event: animation event
  */
  textTransitionDone(event) {
    console.log("[Parallax Home] slideInFadeIn Transition Complete");
  }
}

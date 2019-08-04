import { Component, OnInit } from '@angular/core';
import { revealParallaxAnimation } from '../../../../../shared/animations';

@Component({
  selector: 'parallax-home',
  templateUrl: './parallax-home.component.html',
  styleUrls: ['./parallax-home.component.scss'],
  animations: [ revealParallaxAnimation ]
})
export class ParallaxHomeComponent implements OnInit {

  public parallaxHeight: number;

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
}

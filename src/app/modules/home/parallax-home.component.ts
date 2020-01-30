import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import { revealParallaxAnimation, slideUpFadeIn } from '../../shared/animations';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'parallax-home',
  templateUrl: './parallax-home.component.html',
  styleUrls: ['./parallax-home.component.scss'],
  animations: [ revealParallaxAnimation, slideUpFadeIn ]
})
export class ParallaxHomeComponent implements OnInit, AfterViewInit {


  @HostListener('window:resize') onResize() {
    console.log("[Parallax] resize: ");
    this.parallaxHeight = window.innerHeight;
  }

  public parallaxHeight: number;
  //public state: boolean;  //animation state

  constructor(public themeService : ThemeService) { }

  ngOnInit() {
    let viewportHeight: number = window.innerHeight;
    this.parallaxHeight = viewportHeight
    // if(document.documentElement.clientHeight >= 600) {    //Desktop Screen
    //   this.parallaxHeight = viewportHeight - 64;
    // }
    // else {                                                //Mobile Screen
    //   this.parallaxHeight = viewportHeight - 56;
    // }

    //this.state = false;
  }

  ngAfterViewInit() {
    // this.state=true;
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

import { Component, OnInit, OnDestroy, ViewChild, Inject, ChangeDetectorRef} from '@angular/core';
import { ToggleService } from '../../shared/services/toggle.service';
import { MatSidenav } from '@angular/material';
import { fadeTransition } from '../../animations';
import { DOCUMENT } from '@angular/platform-browser';
import {MediaMatcher} from '@angular/cdk/layout';


import { revealParallaxAnimation } from '../../shared/animations';



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [fadeTransition, revealParallaxAnimation]
})
export class SidenavComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') 
  public sidenav: MatSidenav;
  public contentHeight: number;
  mobileQuery: MediaQueryList;

  //https://uxplanet.org/responsive-design-best-practices-c6d3f5fd163b
  //https://gist.github.com/gokulkrishh/242e68d1ee94ad05f488
  //const width_dynamic : Array<number> = ['960px', '740px', '480px'];

  navItems = [
    {"id":"Home", "iconName":"home", "route":""},
    {"id":"About", "iconName":"account_circle", "route":"about"},
    {"id":"Projects", "iconName":"code", "route":"projects"},
    {"id":"Blog", "iconName":"desktop_windows", "route":"blog"}
  ]
 
 
  private _mobileQueryListener: () => void;

  public parallaxHeight: number;                            //Parallax
 
  constructor(private toggleService: ToggleService, 
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              @Inject(DOCUMENT) private document: Document) 
  { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    //Register current sidenav to toggleService
    this.toggleService.setSidenav(this.sidenav);

    //Set Dynamically set Height of content based on screen sizes
    if(document.documentElement.clientHeight >= 600) {                  //Desktop Screen
      this.contentHeight = document.documentElement.clientHeight - 64;
      //console.log(" contentHeight: " + this.contentHeight);
    }
    else {                                                              //Mobile Screen
      this.contentHeight = document.documentElement.clientHeight - 56;
    }

    /////Parallax Stuff/////////
    if(document.documentElement.clientHeight >= 600) {    //Desktop Screen
      this.parallaxHeight = document.documentElement.clientHeight - 64;
    }
    else {                                                //Mobile Screen
      this.parallaxHeight = document.documentElement.clientHeight - 56;
    }
  }

  //LazyLoad for parallax bg
  showParallax = false;

  loadParallax(someEvent) {
    this.showParallax = true;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  /*
    Get currently active route page
    @outlet: router outlet
  */
  getPage(outlet) {
    // Changing the activatedRouteData.state triggers the animation
    let output = outlet.isActivated ? outlet.activatedRoute : '';
    return outlet.activatedRouteData['page'] || 'content';
  }

  /*
    Callback when route transition animation starts
    @event: animation event
  */
  routeTransitionStarted(event) {
    //console.log("Route Transition Starting");
  }

  /*
    Callback when route transition animation ends
    @event: animation event
  */
  routeTransitionDone(event) {
    //console.log("Route Transition Complete");
  }
}

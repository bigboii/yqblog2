import { ViewEncapsulation, Component, HostBinding, OnInit, OnDestroy, ViewChild, Inject, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ContentScrollListenerService } from './shared/services/contentscrolllistener.service';
import { ThemeService } from './shared/services/theme.service';
import { ToggleService } from './shared/services/toggle.service';;
import { DOCUMENT } from '@angular/common';
import {MediaMatcher} from '@angular/cdk/layout';
import { Router } from '@angular/router';

import { revealParallaxAnimation } from './shared/animations';

import {OverlayContainer} from '@angular/cdk/overlay';

import { fadeTransition } from './shared/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [revealParallaxAnimation, fadeTransition]
  // encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {

  @HostBinding('class') componentCssClass;

  title = 'app';

  public contentHeight: number;
  public routerHeight: number;         //Might need to return this to Sidenav
  public logoPath: string;
  private appTheme: string;

  @ViewChild('drawer', { static: true }) //angular 8: true means allow toggling
  public sidenav: MatSidenav;

  mobileQuery: MediaQueryList;


  //https://uxplanet.org/responsive-design-best-practices-c6d3f5fd163b
  //https://gist.github.com/gokulkrishh/242e68d1ee94ad05f488
  //const width_dynamic : Array<number> = ['960px', '740px', '480px'];

  private _mobileQueryListener: () => void;

  public parallaxHeight: number;                            //Parallax

  navItems = [
    {"id":"Home", "iconName":"home", "route":"home"},
    {"id":"About", "iconName":"account_circle", "route":"about"},
    {"id":"Projects", "iconName":"code", "route":"projects"},
    {"id":"Chat", "iconName":"desktop_windows", "route":"chat"},
    {"id":"ML Classifier", "iconName":"desktop_windows", "route":"ml"}]

  constructor(public themeService : ThemeService,
              private toggleService: ToggleService,
              private scrollListenerService: ContentScrollListenerService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              @Inject(DOCUMENT) private document: Document,
              private router: Router,
              private overlayContainer: OverlayContainer) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    //Register Theme
    this.themeService.currentTheme.subscribe(theme => { 
      // console.log("change detected: " + theme);
      if(theme == "light-theme") {
        this.overlayContainer.getContainerElement().classList.remove("dark-theme");
      }
      else if(theme == "dark-theme") {
        this.overlayContainer.getContainerElement().classList.remove("dark-theme");
      } 
      this.overlayContainer.getContainerElement().classList.add(theme);   //apply theme for dialogs
      this.componentCssClass = theme; 
    });
    this.themeService.currentLogo.subscribe(logo => this.logoPath = logo);    

    //Initialize listening to content scroll
    // this.scrollListenerService.startListeningToScrolling();

    //Register current sidenav to toggleService
    this.toggleService.setSidenav(this.sidenav);

    //Set Dynamically set Height of content based on screen sizes
    if(document.documentElement.clientHeight >= 600) {                  //Desktop Screen
      this.contentHeight = document.documentElement.clientHeight - 64;
    }
    else {                                                              //Mobile Screen
      this.contentHeight = document.documentElement.clientHeight - 56;
    }

    /////Parallax Stuff/////////
    //Calculate Parallax height; 
    if(document.documentElement.clientHeight >= 600) {    //Desktop Screen
      this.parallaxHeight = document.documentElement.clientHeight;
    }
    else {                                                //Mobile Screen
      this.parallaxHeight = document.documentElement.clientHeight;
    }

    console.log("[APP] ngOnInit");
  }


  ngAfterViewInit() {
    //Initialize listening to content scroll
    // this.scrollListenerService.startListeningToScrolling();
  }

  //LazyLoad for parallax bg
  showParallax = false;

  loadParallax(someEvent) {
    this.showParallax = true;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  /***
    SideNav component
  */



  /**
   * 
      Contents below Copied over from "Main" component
   */
  /*
    Get currently active route page
    @outlet: router outlet
  */
 getPage(outletContent) {
  // Changing the activatedRouteData.state triggers the animation
  let output = outletContent.isActivated ? outletContent.activatedRoute : '';
  return outletContent.activatedRouteData['page'] || 'content';

}

/*
  Callback when route transition animation starts
  @event: animation event
*/
routeTransitionStarted(event) {
  console.log("Route Transition Starting");
}

/*
  Callback when route transition animation ends
  @event: animation event
*/
routeTransitionDone(event) {
  console.log("Route Transition Complete");
}



}

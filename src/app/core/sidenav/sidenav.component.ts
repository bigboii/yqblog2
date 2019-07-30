import { Component, OnInit, OnDestroy, ViewChild, Inject, ChangeDetectorRef, AfterViewInit, HostBinding} from '@angular/core';
import { ToggleService } from '../../shared/services/toggle.service';
import { MatSidenav } from '@angular/material';
import { DOCUMENT } from '@angular/platform-browser';
import {MediaMatcher} from '@angular/cdk/layout';

import { Router } from '@angular/router';

import { ThemeService } from '../../shared/services/theme.service';

//import { fadeTransition } from '../../animations';
import { revealParallaxAnimation } from '../../shared/animations';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [revealParallaxAnimation] //fadeTransition
})
export class SidenavComponent implements OnInit, OnDestroy, AfterViewInit {


  @HostBinding('class') componentCssClass;

  @ViewChild('drawer') 
  public sidenav: MatSidenav;
  public contentHeight: number;
  mobileQuery: MediaQueryList;

  private appTheme: string;
  public logoPath: string;

  //https://uxplanet.org/responsive-design-best-practices-c6d3f5fd163b
  //https://gist.github.com/gokulkrishh/242e68d1ee94ad05f488
  //const width_dynamic : Array<number> = ['960px', '740px', '480px'];

  navItems = [
    {"id":"Home", "iconName":"home", "route":"home"},
    {"id":"About", "iconName":"account_circle", "route":"about"},
    {"id":"Projects", "iconName":"code", "route":"projects"},
    {"id":"Chat", "iconName":"desktop_windows", "route":"chat"}  ]
 
 
  private _mobileQueryListener: () => void;

  public parallaxHeight: number;                            //Parallax
 
  constructor(private toggleService: ToggleService, 
              public themeService : ThemeService,
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              @Inject(DOCUMENT) private document: Document,
              private router: Router) 
  { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {

    //Register Theme
    this.themeService.currentTheme.subscribe(theme => { this.componentCssClass = theme; console.log("change detected: " + theme);});
    this.themeService.currentLogo.subscribe(logo => this.logoPath = logo);    

    //Register current sidenav to toggleService
    this.toggleService.setSidenav(this.sidenav);

    //Set Dynamically set Height of content based on screen sizes
    if(document.documentElement.clientHeight >= 600) {                  //Desktop Screen
      this.contentHeight = document.documentElement.clientHeight - 64;
      console.log(" contentHeight: " + this.contentHeight);
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

  }

  ngAfterViewInit() {

  }

  //LazyLoad for parallax bg
  showParallax = false;

  loadParallax(someEvent) {
    this.showParallax = true;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  //Implement below in future
/*
  secondaryNav(path) {
    this.router.navigate([{ outlets: {
      parallax: [path]
    }}]);
  }
  */

  
}

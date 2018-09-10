import { Component, OnInit, OnDestroy, ViewChild, Inject, ChangeDetectorRef} from '@angular/core';
import { ToggleService } from '../services/toggle.service';
import { MatSidenav } from '@angular/material';
import { fadeTransition } from '../animations';
import { DOCUMENT } from '@angular/platform-browser';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [fadeTransition]
})
export class SidenavComponent implements OnInit, OnDestroy {

  @ViewChild('drawer') 
  public sidenav: MatSidenav;
  public contentHeight: number;
  mobileQuery: MediaQueryList;

  navItems = [
    {"id":"Home", "iconName":"home", "route":""},
    {"id":"About", "iconName":"account_circle", "route":"about"},
    {"id":"Projects", "iconName":"code", "route":"projects"},
    {"id":"Blog", "iconName":"desktop_windows", "route":"blog"}

  ]
 
  private _mobileQueryListener: () => void;
 
  constructor(private toggleService: ToggleService, 
              changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher) 
  { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    //Dynamically set content height based on screen size
    //this.contentHeight = document.documentElement.clientHeight;
    //console.log("[sideNav] content height " + this.contentHeight);

    //Register current sidenav to toggleService
    this.toggleService.setSidenav(this.sidenav);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getState(outlet) {
    console.log("--- Route Activated ---");
    //console.dir(outlet);
    //console.log("outlet.activatedRouteData.state: " + outlet.activatedRouteData.state);

    //console.log("outlet.isActivated: " + outlet.isActivated);
    //console.log("outlet.activatedRoute: " + outlet.activatedRoute);
  /*
    o.isActivated ? o.activatedRoute : ''
  */

    // Changing the activatedRouteData.state triggers the animation
    //return outlet.activatedRouteData.state;

    let output = outlet.isActivated ? outlet.activatedRoute : '';
    console.log("router output: " + output);
    return output
  }

  routeTransitionStarted(event) {
    console.log("+++++++++++++++++++++++++++");
    console.log("Route Transition Starting");
  }

  routeTransitionDone(event) {
    console.log("--------------------------");
    console.log("Route Transition Complete");
  }
}

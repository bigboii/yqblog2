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
              media: MediaMatcher,
              @Inject(DOCUMENT) private document: Document) 
  { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    //Dynamically set content height based on screen size

    //Register current sidenav to toggleService
    this.toggleService.setSidenav(this.sidenav);

    //Set Dynamically set Height of content based on screen sizes
    if(document.documentElement.clientHeight >= 600) {  //Desktop Screen
      this.contentHeight = document.documentElement.clientHeight - 64;
    }
    else {                                                //Mobile Screen
      this.contentHeight = document.documentElement.clientHeight - 56;
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getPage(outlet) {
    // Changing the activatedRouteData.state triggers the animation
    //return outlet.activatedRouteData.state;

    let output = outlet.isActivated ? outlet.activatedRoute : '';
    return outlet.activatedRouteData['page'] || 'content';
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

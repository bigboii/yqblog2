import { Component, HostBinding, OnInit, AfterViewInit } from '@angular/core';

import { fadeTransition } from '../../animations';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  animations: [fadeTransition]
})
export class MainComponent implements OnInit, AfterViewInit {

  public contentHeight: number;
  public routerHeight: number;         //Might need to return this to Sidenav

  ngOnInit() {

      //Set Dynamically set Height of content based on screen sizes
    if(document.documentElement.clientHeight >= 600) {                  //Desktop Screen
      this.contentHeight = document.documentElement.clientHeight - 64;
      console.log(" contentHeight: " + this.contentHeight);
    }
    else {                                                              //Mobile Screen
      this.contentHeight = document.documentElement.clientHeight - 56;
    }
  }

  ngAfterViewInit() {
        //Calculate router-outlet height
    this.routerHeight = document.getElementsByTagName('router-outlet')[0].nextElementSibling.scrollHeight;
    console.log(" routerHeight: " + this.routerHeight);
  }

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

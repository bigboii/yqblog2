import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';

import { fadeTransition } from '../../shared/animations';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  encapsulation: ViewEncapsulation.None,   //?? added this to help stretch router outlet, https://blog.thoughtram.io/angular/2015/06/29/shadow-dom-strategies-in-angular2.html
  styleUrls: ['./main.component.scss'],
  animations: [fadeTransition]
})
export class MainComponent implements OnInit {

  public contentHeight: number;
  public routerHeight: number;         //Might need to return this to Sidenav

  public logoPath: string;

  constructor(public themeService : ThemeService) {

  }

  ngOnInit() {

     //Set Dynamically set Height of content based on screen sizes
     //TODO: recalculate height on resize()
    if(document.documentElement.clientHeight >= 600) {                  //Desktop Screen
      this.contentHeight = document.documentElement.clientHeight - 64;
    }
    else {                                                              //Mobile Screen
      this.contentHeight = document.documentElement.clientHeight - 56;
    }

    this.themeService.currentLogo.subscribe(logo => this.logoPath = logo);    
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

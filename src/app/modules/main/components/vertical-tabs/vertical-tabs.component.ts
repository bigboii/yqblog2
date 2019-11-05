import { Component, OnInit, Input, Inject, ElementRef, ViewChildren, QueryList } from '@angular/core';
// import { MaterialElevationDirective } from '../../../../shared/directives/material-elevation.directive';
import { DOCUMENT } from '@angular/common';
import { fadeIn} from '../../../../shared/animations';
import { VerticalTabComponent } from '../vertical-tab/vertical-tab.component';
import { tabVerticalSlide0, tabVerticalSlide1, tabVerticalSlide2, verticalTabContentFadeIn} from './vertical-tabs.animation';

@Component({
  selector: 'app-vertical-tabs',
  templateUrl: './vertical-tabs.component.html',
  styleUrls: ['./vertical-tabs.component.scss'],
  animations: [ fadeIn, tabVerticalSlide0, tabVerticalSlide1, tabVerticalSlide2, verticalTabContentFadeIn]
})
export class VerticalTabsComponent implements OnInit {

  @Input() private cardData;
  // public tabs: Object = {};            //reference to status of all tabs
  private currentTab: Object;          //reference to currently selected tab
  @ViewChildren(VerticalTabComponent) tabs : QueryList<VerticalTabComponent>;
  
  private tabHeight: number = 52;

  constructor(@Inject(DOCUMENT) private document: Document, private el: ElementRef) { }

  ngOnInit() {
    this.tabs["tab0"] = { "index":0, "id": "tab0", "isShow":true, "state": "selected" };
    this.tabs["tab1"] = { "index":1, "id": "tab1", "isShow":false, "state": "hide" };
    this.tabs["tab2"] = { "index":2, "id": "tab2", "isShow":false, "state": "hide" };

    this.currentTab = this.tabs["tab0"];

    console.log("vertical-tabs children: ");
    console.log(this.tabs);

    let firstTab = this.tabs.find(function(value, index){
      if (index==0)
        return true;
    });

    firstTab.state = "selected";
  }

  /**
    Event Handler when user clicks on one of the tabs
  */
  public openTab(event: Event, id: string) {

    console.dir(this.tabs);

    //---------- New Version ------------
    if(this.currentTab["id"] == id) {

      this.tabs.toArray()[id]
      // this.tabs[id]["state"] = "selected";
      // this.tabs[id]["isShow"] = true;

      return;     //no further logic is necessary
    }

    this.tabs.toArray().forEach(tab => {
      //determine state for newly selected tab
      if(tab.tabId == id) {
        if(this.currentTab["index"] > tab.index) { //slide up
          tab.isShow = true;
          tab.state = "selected";
          tab.slideVector = tab.index * this.tabHeight;    //find way to dynamically get height of button (52)      
        }
        else {                                     //slide down?
          tab.isShow = true;
          tab.state = "selected";
          tab.slideVector = tab.index * this.tabHeight; 
        }   
      }
      //determine state for recently deselected tab
      else {
        let deselectedTabId = this.currentTab["id"];

        if(this.currentTab["index"] == tab.index) {
          //doNothing
        }
        else if(this.currentTab["index"] > tab.index) {  //slide up
          this.tabs.toArray()[deselectedTabId].isShow = false;
          this.tabs.toArray()[deselectedTabId].state = "slideUp";
          this.tabs.toArray()[deselectedTabId].slideVector = tab.index * 1 * this.tabHeight;
        }
        else {
          this.tabs.toArray()[deselectedTabId].isShow = false;
          this.tabs.toArray()[deselectedTabId].state = "slideDown";
          this.tabs.toArray()[deselectedTabId].slideVector = tab.index * -1 * this.tabHeight;
        }
      }
    });

    this.currentTab = this.tabs.toArray()[id];
  }
}

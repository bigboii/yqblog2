import { Component, OnInit, Input, Inject, ViewEncapsulation  } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { fadeIn} from '../../../shared/animations';
import { dynamicTabVerticalSlide, tabVerticalSlide,  verticalTabContentFadeIn} from './vertical-tabs.animation';

@Component({
  selector: 'app-vertical-tabs',
  templateUrl: './vertical-tabs.component.html',
  styleUrls: ['./vertical-tabs.component.scss'],
  animations: [ fadeIn, 
    dynamicTabVerticalSlide(64, "red"), 
    tabVerticalSlide, verticalTabContentFadeIn]
  // encapsulation: ViewEncapsulation.Emulated           //ViewEncapsulation.emulated
})
export class VerticalTabsComponent implements OnInit {

  @Input() cardData;
  public tabs: Object = {};            //reference to status of all tabs
  private currentTab: Object;          //reference to currently selected tab

  private slideVector;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {
    this.tabs["tab0"] = { "index":0, "id": "tab0", "isShow":true, "state": "selected" };
    this.tabs["tab1"] = { "index":1, "id": "tab1", "isShow":false, "state": "hide" };
    this.tabs["tab2"] = { "index":2, "id": "tab2", "isShow":false, "state": "hide" };

    this.currentTab = this.tabs["tab0"];
  }

  /**
    Event Handler when user clicks on one of the tabs
  */
  public openTab(event: Event, id: string) {
    //console.dir(this.tabs)

    if(this.currentTab["id"] == id) {
      
      this.tabs[id]["state"] = "selected";
      this.tabs[id]["isShow"] = true;
      
      return;     //no further logic is necessary
    }

    for(let tab of Object.entries(this.tabs)) {
      let tabId = tab[0];
      let index = tab[1]["index"];
      let show = tab[1]["show"]

      //determine state for newly selected tab
      if(tabId == id) {
          this.tabs[tabId]["isShow"] = true;
          this.tabs[tabId]["state"] = "selected";
      }
      //determine state for recently deselected tab
      else {
        let deselectedTabId = this.currentTab["id"];
        this.tabs[deselectedTabId]["isShow"] = false;
        this.tabs[deselectedTabId]["state"] = "deselected";
      }

      
    }

    this.currentTab = this.tabs[id];

    if(id=="tab0") {
      this.slideVector = 0;
    }
    else if(id=="tab1") {
      this.slideVector = 52;
    }
    else {
      this.slideVector = 104;
    }
  }
}

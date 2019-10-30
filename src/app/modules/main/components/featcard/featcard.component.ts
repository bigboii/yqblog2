import { Component, OnInit, AfterViewInit, Input, Inject } from '@angular/core';
// import { MaterialElevationDirective } from '../../../../shared/directives/material-elevation.directive';
import { DOCUMENT } from '@angular/common';
import { fadeIn, tabOmniSlide0, tabOmniSlide1, tabOmniSlide2, verticalTabContentFadeIn } from '../../../../shared/animations';

@Component({
  selector: 'app-featcard',
  templateUrl: './featcard.component.html',
  styleUrls: ['./featcard.component.scss'],
  animations: [ fadeIn, tabOmniSlide0, tabOmniSlide1, tabOmniSlide2, verticalTabContentFadeIn ]
})
export class FeatcardComponent implements OnInit, AfterViewInit {

  @Input() cardData;
  private tabcontents;
  private tablinks;
  private currentTab: Object;          //reference to current tab

  constructor(@Inject(DOCUMENT) private document: Document) { }

  public visibleTabContents: Array<Object> = [];     //TODO: convert this to MAP
  public tabs: Object = {};

  ngOnInit() {
    this.tabs["tab0"] = { "index":0, "id": "tab0", "isShow":true, "state": "selected" };
    this.tabs["tab1"] = { "index":1, "id": "tab1", "isShow":false, "state": "hide" };
    this.tabs["tab2"] = { "index":2, "id": "tab2", "isShow":false, "state": "hide" };

    this.currentTab = this.tabs["tab0"];
  }

//https://www.w3schools.com/howto/howto_js_vertical_tabs.asp
  ngAfterViewInit() {
    // Get the element with id="defaultOpen" and click on it
    // (document.getElementById("defaultOpen") as HTMLFormElement).click();
  }

  onMouseEnter(event : Event) {
    console.log("[featcard] mouseEnter");
  }

  onMouseLeave(event : Event) {
    console.log("[featcard] mouseLeave");
  }

  /**
    Tab logic
  */

  //TODO: finalize animations; logic complete
  public openTab(event: Event, id: string) {
    console.dir(this.tabs);

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
      
        // else {
          let deselectedTabId = this.currentTab["id"];
          if(this.currentTab["index"] > index) {  //slide up
            this.tabs[tabId]["isShow"] = true;
            // this.tabs[tabId]["state"] = "selectedUp";
            this.tabs[tabId]["state"] = "selected";
            // console.log("slide up: " + id);
          }
          else {                                  //slide down
            this.tabs[tabId]["isShow"] = true;
            // this.tabs[tabId]["state"] = "selectedDown";
            this.tabs[tabId]["state"] = "selected";
            // console.log("slide down: " + id);
          }
        // }        
      }
      //determine state for recently deselected tab
      else {
        let deselectedTabId = this.currentTab["id"];
        // console.log("[deselect] slide up: " + this.currentTab["index"] + ", " + index);
        if(this.currentTab["index"] == index) {
          //doNothing
          // console.log("[deselect] nothing done");
        }
        else if(this.currentTab["index"] > index) {  //slide up
          this.tabs[deselectedTabId]["isShow"] = false;
          this.tabs[deselectedTabId]["state"] = "deselectedUp";
        }
        else {
          // console.log("[deselect] slide down");
          this.tabs[deselectedTabId]["isShow"] = false;
          this.tabs[deselectedTabId]["state"] = "deselectedDown"
        }
      }

      

    }

    this.currentTab = this.tabs[id];
    // this.visibleTabConent[id]["show"]=true;


    // console.log("[featcard] openTab: " + id);
    // this.tabcontents = (document.getElementsByClassName("tabcontent") as HTMLCollection);
    // console.log("tabcontents: " + this.tabcontents);
    // console.dir(this.tabcontents)
    // for(let tabcontent of this.tabcontents) {
    //   console.log("tabcontent: " + tabcontent);

    //   tabcontent.style.display = "none";
    // }

    // this.tablinks = (document.getElementsByClassName("tablinks") as HTMLCollection);
    // console.log("tablinks: " + this.tablinks);
    // console.dir(this.tablinks)
    // for(let tablink of this.tablinks) {
    //   tablink.className = tablink.className.replace("active", "");
    // }

    // (document.getElementById(id) as HTMLElement).style.display = "block";

    // (event.currentTarget as HTMLInputElement).className += " active";
  }

  public determineSlideDirection() {

  }


  // displayEmitterResults(someEvent) {
  //   let index = someEvent["index"];
  //   this.visibleTabContent[index]["show"]=someEvent["state"];
  // }
}

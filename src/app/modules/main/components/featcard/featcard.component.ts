import { Component, OnInit, AfterViewInit, Input, Inject } from '@angular/core';
// import { MaterialElevationDirective } from '../../../../shared/directives/material-elevation.directive';
import { DOCUMENT } from '@angular/common';
import { fadeIn, tabOmniSlide, verticalTabContentFadeIn } from '../../../../shared/animations';

@Component({
  selector: 'app-featcard',
  templateUrl: './featcard.component.html',
  styleUrls: ['./featcard.component.scss'],
  animations: [ fadeIn, tabOmniSlide, verticalTabContentFadeIn ]
})
export class FeatcardComponent implements OnInit, AfterViewInit {

  @Input() cardData;
  private tabcontents;
  private tablinks;
  private currentTab: Object;          //reference to current tab

  constructor(@Inject(DOCUMENT) private document: Document) { }

  public visibleTabContents: Array<Object> = [];     //TODO: convert this to MAP
  //public visibleTabContentMap: Map<string,boolean>;     //TODO: convert this to MAP
  public tabs: Object = {};

  ngOnInit() {
    // this.visibleTabContents.push({ "index":0, "id": "tab0", "show": false });
    // this.visibleTabContents.push({ "index":1, "id": "tab1", "show": false });
    // this.visibleTabContents.push({ "index":2, "id": "tab2", "show": false });

    this.tabs["tab0"] = { "index":0, "id": "tab0", "isShow":true, "state": "selectedUp" };
    this.tabs["tab1"] = { "index":1, "id": "tab1", "isShow":false, "state": "hide" };
    this.tabs["tab2"] = { "index":2, "id": "tab2", "isShow":false, "state": "hide" };

    // this.visibleTabContentMap["tab0"][0] = true;
    // this.visibleTabContentMap["tab1"][] = false;
    // this.visibleTabContentMap["tab2"] = false;
    this.currentTab = this.tabs["tab0"];
  }

//https://www.w3schools.com/howto/howto_js_vertical_tabs.asp
  ngAfterViewInit() {
    // Get the element with id="defaultOpen" and click on it
    (document.getElementById("defaultOpen") as HTMLFormElement).click();
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
  // public openTab(event: Event, id: string) {
  //   console.log("[featcard] openTab: " + id);
  //   this.tabcontents = (document.getElementsByClassName("tabcontent") as HTMLCollection);
  //   console.log("tabcontents: " + this.tabcontents);
  //   console.dir(this.tabcontents)
  //   for(let tabcontent of this.tabcontents) {
  //     console.log("tabcontent: " + tabcontent);

  //     tabcontent.style.display = "none";
  //   }

  //   this.tablinks = (document.getElementsByClassName("tablinks") as HTMLCollection);
  //   console.log("tablinks: " + this.tablinks);
  //   console.dir(this.tablinks)
  //   for(let tablink of this.tablinks) {
  //     tablink.className = tablink.className.replace("active", "");
  //   }

  //   (document.getElementById(id) as HTMLElement).style.display = "block";

  //   (event.currentTarget as HTMLInputElement).className += " active";
  // }

  //TODO: finalize animations; logic complete
  public openTab(event: Event, id: string) {
    console.log(this.tabs);


    // for(let visibleTabContent of this.visibleTabContents) {
    for(let tab of Object.entries(this.tabs)) {
      let tabId = tab[0];
      let index = tab[1]["index"];
      let show = tab[1]["show"]

      if(tabId == id) {
        //determine direction
        if(this.currentTab["id"] == tabId) {
          console.log("sameTab, do Nothing: " + id);
          this.tabs[tabId]["state"] = "selected";
        }
        else {
          if(this.currentTab["index"] > index) {  //slide up
            this.tabs[tabId]["isShow"] = true;
            this.tabs[tabId]["state"] = "selectedUp";
            console.log("slide up: " + id);
          }
          else {                                  //slide down
            this.tabs[tabId]["isShow"] = true;
            this.tabs[tabId]["state"] = "selectedDown";
            console.log("slide down: " + id);
          }

        }
        if(this.currentTab )
          // console.log("1: " + tabId);
          this.tabs[tabId]["isShow"] = true;
          this.currentTab = this.tabs[tabId];
      }
      else {
        // console.log("2: " + tabId);
        this.tabs[tabId]["isShow"] = false;
        this.tabs[tabId]["state"] = "hide";
      }
    }
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

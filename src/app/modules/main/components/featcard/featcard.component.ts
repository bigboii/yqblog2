import { Component, OnInit, AfterViewInit, Input, Inject } from '@angular/core';
// import { MaterialElevationDirective } from '../../../../shared/directives/material-elevation.directive';
import { DOCUMENT } from '@angular/common';
import { fadeIn, fadeInOnClick } from '../../../../shared/animations';

@Component({
  selector: 'app-featcard',
  templateUrl: './featcard.component.html',
  styleUrls: ['./featcard.component.scss'],
  animations: [ fadeIn, fadeInOnClick ]
})
export class FeatcardComponent implements OnInit, AfterViewInit {

  @Input() cardData;
  private tabcontents;
  private tablinks;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  public visibleTabContent: Array<Object> = [];     //TODO: convert this to MAP
  //public visibleTabContentMap: Map<string,boolean>;     //TODO: convert this to MAP
  public visibleTabContentMap: Object;

  ngOnInit() {
    // this.visibleTabContent.push({ "id": "tab0", "show": false });
    // this.visibleTabContent.push({ "id": "tab1", "show": false });
    // this.visibleTabContent.push({ "id": "tab2", "show": false });
    // this.visibleTabContentMap.set("tab0", false);
    // this.visibleTabContentMap.set("tab1", false);
    // this.visibleTabContentMap.set("tab2", false);
    this.visibleTabContentMap = {"tab0": false};
    this.visibleTabContentMap = {"tab1": false};
    this.visibleTabContentMap = {"tab2": false};
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

  public openTab(event: Event, id: string) {
    if(this.visibleTabContent[id]==true) {
      this.visibleTabContent[id]=false;
    }
    if(this.visibleTabContent[id]==false) {
      this.visibleTabContent[id]=true;
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


  // displayEmitterResults(someEvent) {
  //   let index = someEvent["index"];
  //   this.visibleTabContent[index]["show"]=someEvent["state"];
  // }
}

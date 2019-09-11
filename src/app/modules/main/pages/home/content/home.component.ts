import { Component, OnInit, Inject } from '@angular/core';
import { revealOnScrollAnimation } from '../../../../../shared/animations';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ revealOnScrollAnimation ]
})
export class HomeComponent implements OnInit{

  private languages : Array<String>;
  private frameworks : Array<String>;
  private databases : Array<String>;
  private framework : Array<String>;

  public parallaxHeight: number;
  public visibleSections: Array<Object> = [];
  private cards: Array<Object>;
  public showParallax : boolean;

  panelOpenState = false;

  constructor(@Inject(DOCUMENT) private document: Document) 
  { 

  }

  ngOnInit() {
    if(document.documentElement.clientHeight >= 600) {    //Desktop Screen
      this.parallaxHeight = document.documentElement.clientHeight - 64;
    }
    else {                                                //Mobile Screen
      this.parallaxHeight = document.documentElement.clientHeight - 56;
    }

    this.languages = ["Java", "C", "C++", "Spring", "HashiCorp", "VMWare"];
    this.frameworks = ["Angular", "Node.js", "JavaScript", "TypeScript"];
    this.databases=["SQL", "MongoDB", "Firebase", "Logstash", "Filebeat"];
    this.framework=["Spring", "Hashicorp"]

    this.visibleSections.push({ "id": 0, "show": false });
    this.visibleSections.push({ "id": 1, "show": false });
    this.visibleSections.push({ "id": 2, "show": false });
    this.visibleSections.push({ "id": 3, "show": false });

    this.cards= 
    [
      {
        "id": "tab0",
        "title": "Bank of America (Current)",
        "position": "Software Engineer (Officer)",
        "subTitle": "Jun 2017 - Present",
        "imgPath":"./assets/imgs/card_bofa.png",
        "description": [
          "Private cloud platform used internally within the firm that lets companies build virtual machines.",
          "Actively manageing over 100,000 Virtual Machines",
          "Todo: Implement a user friendly monitoring tool",
        ]
      },
      {
        "id": "tab1",
        "title": "Bank of America",
        "position": "Intern",
        "subTitle": "Jun 2016 - Aug 2016",
        "imgPath":"./assets/imgs/card_bofa.png",
        "description":[
          "Designed and implemented a web application, Time Management System (TMS)",
          "Developed using MEAN stack to host web application",
          "Utilized Bootstrap for the overall layout combined",
          "Utilized Kendo UI to visualize json via charts and graphs."
        ]
      },
      {
        "id": "tab2",
        "title": "HeyKorean",
        "position": "Android Developer, Internship",
        "subTitle": "Aug 2013 - April 2014",
        "imgPath": "./assets/imgs/heykorean_logo.png",
        "description": [
          "First Internship",
          "I HeyKorean taught me what its like to work in an industry.",
          "Assisted senior engineers to launch and launching of Single To Mingle. ",
          "http://singletomingle.us/mingle.html"
        ]
      }
    ];
  
    //LazyLoad for parallax bg
    this.showParallax = false;
  }

  loadParallax(someEvent) {
    this.showParallax = true;
  }

  displayEmitterResults(someEvent) {
    let index = someEvent["index"];
    this.visibleSections[index]["show"]=someEvent["state"];
  }
}

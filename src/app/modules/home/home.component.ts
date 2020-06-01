import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { revealOnScrollAnimation, revealParallaxAnimation, slideUpFadeIn } from '../../shared/animations';
import { DOCUMENT } from '@angular/common';
import * as _ from "lodash";       //debugging

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ revealOnScrollAnimation, revealParallaxAnimation, slideUpFadeIn ],
})
export class HomeComponent implements OnInit, AfterViewInit{

  private languages : Array<String>;
  private technologies : Array<String>;
  private databases : Array<String>;
  private tools : Array<String>;
  private learning : Array<String>;

  public parallaxHeight: number;
  public visibleSections: Array<Object> = [];
  private tabContents: Array<Object>;
  private projectTiles: Array<Object>;
  public showParallax : boolean;

  panelOpenState = false;

  public allItems;

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

    this.languages = ["Java", "Spring Boot", "C++"];
    this.technologies = ["HTML && SCSS", "Angular", "Node.js", "JavaScript && TypeScript"];
    this.databases=["MongoDB", "Logstash", "Filebeat"];
    this.tools=["Jenkins", "[Hashicorp] Consul, Nomad, Vault", "Elastic, Logstash, Kibana (ELK)"]

    this.learning = ["Python", "ML"] ; 

    this.visibleSections.push({ "id": 0, "show": false });
    this.visibleSections.push({ "id": 1, "show": false });
    this.visibleSections.push({ "id": 2, "show": false });
    this.visibleSections.push({ "id": 3, "show": false });
    this.visibleSections.push({ "id": 4, "show": false });

    this.tabContents= 
    [
      {
        "id": "tab0",
        "title": "Bank of America",
        "position": "Software Engineer (Officer)",
        "subTitle": "Jun 2017 - Present",
        "imgPath":"./assets/imgs/card_bofa.png",
        "description": [
          "Private Cloud Platform where internal users can rapidly provision compliant and secure VMs and Loadbalancers",
          "Write modern, performant, maintainable microservices using Spring to power cloud infrastructure",
          "Continuously implementing features to automate manual tasks (e.g. recovery on build failure)",
          "Contributed to development and maintenance of in-house orchestration engine",
          "Contributed in automating deployment process using Jenkins, Artifactory, and various Hashicorp Tools;",
          "Distributed Tracing using Spring rest templates, traceIds in headers, and ELK stack"
        ]
      },
      {
        "id": "tab1",
        "title": "Bank of America",
        "position": "Tech Intern",
        "subTitle": "Jun 2016 - Aug 2016",
        "imgPath":"./assets/imgs/card_bofa.png",
        "description":[
          "Proactively supported team building and onboarding applications via mentoring",
          "Designed and implemented Time Management System (TMS), built using MEAN stack",
          "Utilized Bootstrap and Kendo UI to visualize json data via charts and graphs."
        ]
      },
      {
        "id": "tab2",
        "title": "HeyKorean",
        "position": "Android Developer, Internship",
        "subTitle": "Aug 2013 - April 2014",
        "imgPath": "./assets/imgs/heykorean_logo.png",
        "description": [
          "Gained insight on industry level practices on Android software development.",
          "Assisted senior engineers in developing and launching of a mobile dating application, Single To Mingle. ",
          "http://singletomingle.us/mingle.html"
        ]
      }
    ];

    this.projectTiles = [
      {
        "index":0,
        "title":"Personal Website V2",
        "description":"2nd iteration of my personal website built using MEAN (Angular 8)",
        "bulletPoints":[
          "Material Design UX guidelines",
          "Angular"
        ],
        "technologies":["Mongo, Express, Angular, Node.js"]
      },
      {
        "index":3,
        "title": "Simple Machine Learning Client",
        "description":"Re-implemented various ML classification algorithms for learning purposes.",
        "bulletPoints": [
          "Naive Bayes Classifier",
          "Perceptron (least square loss) Classifier",
          "Support Vector Machine (Hinge Loss) Classifier",
          "Logistic Discrimination Classifier"
        ],
        "technologies":["Angular", "Python", "Spring"]
      },
      {
        "index":1,
        "title": "Content Management System",
        "description":"A CMS for my blog, currently in Progress",
        "technologies":["Mongo", "Spring", "In Progress"]
      },
      {
        "index":2,
        "title": "Comment System",
        "description":"A simple comment system for my blog",
        "technologies":["Spring", "Mongo", "In Progress"]
      },
      {
        "index":4,
        "title": "Simple Chat",
        "description":"Implemented a simple chat app with a material design based UI",
        "technologies":["Angular, Node.js, SocketIO"]
      },
      {
        "index":4,
        "title": "Affordable Care Act XML Form Generator",
        "description":"Parses user generated excel data  XML based excel data. This is required when submitting more than 50 forms at once.",
        "bulletPoints": [
          "Generates XML forms for 1094-B, 1095-B, 1094-C, and 1095-C",
          "XML format mandatory when employer files 1095B/1095C for more than 50 employees",
          "https://www.irs.gov/e-file-providers/affordable-care-act-information-returns-air"
        ],
        "technologies":["Spring", ""]
      }
    ]

    //LazyLoad for parallax bg
    this.showParallax = false;

  }

  ngAfterViewInit() {
    //Masonry onload code
    this.resizeAllGridItems();
    window.addEventListener("resize", this.resizeAllGridItems);
  
    this.allItems = document.getElementsByClassName("masonry");
    for(let x=0;x< this.allItems.length;x++){
      this.resizeInstance(this.allItems[x]);
      // this.imagesLoaded( this.allItems[x], this.resizeInstance);
    }
  }

  loadParallax(someEvent) {
    this.showParallax = true;
  }

  displayEmitterResults(someEvent) {
    let index = someEvent["index"];
    this.visibleSections[index]["show"]=someEvent["state"];
  }

  /*
    Masonry Style Test code below
  */
 resizeGridItem(item){
   console.log("resizeGridItem() called");
    let grid = document.getElementsByClassName("masonry")[0];
    let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
    let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
    let rowSpan = Math.ceil((item.querySelector('.masonItemContent').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));

    item.style.gridRowEnd = "span "+rowSpan;
  }

  resizeAllGridItems(){
    console.log("resizeAllGridItems() called");
    let allItems = document.getElementsByClassName("masonItem");
    for(let x=0;x<allItems.length;x++){
      this.resizeGridItem(allItems[x]);
    }
  }

  resizeInstance(instance){
    console.log("resizeInstance() called");
    let item = instance.elements[0];
    this.resizeGridItem(item);
  }

}

import { Component, OnInit, Inject } from '@angular/core';
import { revealOnScrollAnimation, revealParallaxAnimation } from '../animations';
import { DOCUMENT } from '@angular/platform-browser';

//TODO: Add animation for background images
//https://coryrylan.com/blog/introduction-to-angular-router-animations

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  animations: [ revealOnScrollAnimation, revealParallaxAnimation ]
})
export class ContentComponent implements OnInit {

  languages = ["Java", "C", "C++", "JavaScript", "TypeScript"];
  frameworks = ["Angular", "Spring", "Node", "Android"];
  tools=["Bash", "Git", "NPM"];
  databases=["SQL", "MongoDB", "Firebase"];

  public parallaxHeight: number;

  constructor(@Inject(DOCUMENT) private document: Document) 
  { 

  }

  ngOnInit() {

    if(document.documentElement.clientHeight >= 600) {  //Desktop Screen
      this.parallaxHeight = document.documentElement.clientHeight - 64;
    }
    else {                                                //Mobile Screen
      this.parallaxHeight = document.documentElement.clientHeight - 56;
    }

    console.log("document.height: " + document.documentElement.clientHeight);
  }

  //Static Data
  cards= [
    {
      "title": "Bank of America (Current)",
      "subTitle": "Software Engineer (Officer)",
      "imgPath":"./assets/imgs/card_bofa.png",
      "description":"By following an agile methodology and microservices framework, I work with my team to rapidly deliver a private enterprise cloud. Utilizing both vendor and opensource technologies. The service provides pre-defined VMs or a custom one in a self serve manne. I helped my team add new features, simplify our data set, and ensured that our infrastructure works after a framework migration."
    },
    {
      "title": "Bank of America",
      "subTitle": "Technicaly Analyst, Internship",
      "imgPath":"./assets/imgs/card_bofa.png",
      "description":"This internship is when I got into web development for the first time. I was responsible for designing and implementing a web application, Time Management System (TMS). Using the MEAN stack approach, I used bootstrap for the overall layout combined with Kendo UI for presenting a bunch of json into a more meaningful way via graphs."
    },
    {
      "title": "HeyKorean",
      "subTitle": "Android Developer, Internship",
      "imgPath": "./assets/imgs/heykorean_logo.gif",
      "description":"As my first internship, I HeyKorean taught me what its like to work in an industry. During the 6 months, I assisted my Senior Developers with the planning, development, and launching of Single To Mingle. http://singletomingle.us/mingle.html"
    }
  ];

  //LazyLoad for parallax bg
  showParallax = false;

  //Animation for sections
  public visibleSections: Array<Object> = [
    { "id": 0, "show": false },
    { "id": 1, "show": false },
    { "id": 2, "show": false },
    { "id": 3, "show": false }
  ];

  loadParallax(someEvent) {
    console.log("+++++ LOADING PARALLAX +++++");
    this.showParallax = true;
  }

  displayEmitterResults(someEvent) {
    //console.log("[displayEmitterResults] index: "+ someEvent["index"]);
    //console.log("[displayEmitterResults] state: "+ someEvent["state"]);
    let index = someEvent["index"];
    this.visibleSections[index]["show"]=someEvent["state"];
  }

  /*
  onContentScroll(event) { 
    console.log("[onContentScroll] scroller");
  }
  */
}

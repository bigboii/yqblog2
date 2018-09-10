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

    console.log("dcoument.height: " + document.documentElement.clientHeight);
  }

  //Static Data
  cards= [
    {
      "title": "Bank of America (Current)",
      "subTitle": "Software Engineer (Officer)",
      "imgPath":"./assets/imgs/boa_logo.svg",
      "description":"My team works on building building the private cloud. Using Spring Boot and other tools, I helped my team add new features, simplify our data set, and ensured that our infrastructure works after a framework migration."
    },
    {
      "title": "Bank of America",
      "subTitle": "Technicaly Analyst, Internship",
      "imgPath":"./assets/imgs/boa_logo.svg",
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

}

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
  public visibleSections: Array<Object>;
  private cards: Array<Object>;
  public showParallax : boolean;

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
        "id": 0,
        "title": "Bank of America (Current)",
        "subTitle": "Software Engineer (Officer)",
        "imgPath":"./assets/imgs/card_bofa.png",
        "description":"By following an agile methodology and microservices framework, I work with my team to rapidly deliver a private enterprise cloud. Utilizing both vendor and opensource technologies. The service provides pre-defined VMs or a custom one in a self serve manne. I helped my team add new features, simplify our data set, and ensured that our infrastructure works after a framework migration."
      },
      {
        "id": 1,
        "title": "Bank of America",
        "subTitle": "Technicaly Analyst, Internship",
        "imgPath":"./assets/imgs/card_bofa.png",
        "description":"This internship is when I got into web development for the first time. I was responsible for designing and implementing a web application, Time Management System (TMS). Using the MEAN stack approach, I used bootstrap for the overall layout combined with Kendo UI for presenting a bunch of json into a more meaningful way via graphs."
      },
      {
        "id": 2,
        "title": "HeyKorean",
        "subTitle": "Android Developer, Internship",
        "imgPath": "./assets/imgs/heykorean_logo.png",
        "description":"As my first internship, I HeyKorean taught me what its like to work in an industry. During the 6 months, I assisted my Senior Developers with the planning, development, and launching of Single To Mingle. http://singletomingle.us/mingle.html"
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

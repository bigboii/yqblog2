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
  private technologies : Array<String>;
  private databases : Array<String>;
  private tools : Array<String>;

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

    this.languages = ["Java, Spring Boot", "C++", "JavaScript", "TypeScript",];
    this.technologies = ["Angular", "Node.js", "JavaScript", "TypeScript"];
    this.databases=["SQL", "MongoDB", "Firebase", "Logstash", "Filebeat"];
    this.tools=["Jenkins", "[Hashicorp] Consul, Nomad, Vault", "Elastic, Logstash, Kibana (ELK)"]

    this.visibleSections.push({ "id": 0, "show": false });
    this.visibleSections.push({ "id": 1, "show": false });
    this.visibleSections.push({ "id": 2, "show": false });
    this.visibleSections.push({ "id": 3, "show": false });
    this.visibleSections.push({ "id": 4, "show": false });

    this.cards= 
    [
      {
        "id": "tab0",
        "title": "Bank of America (Current)",
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

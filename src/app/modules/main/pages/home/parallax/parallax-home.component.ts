import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'parallax-home',
  templateUrl: './parallax-home.component.html',
  styleUrls: ['./parallax-home.component.scss']
})
export class ParallaxHomeComponent implements OnInit {

  public parallaxHeight: number;                            //Parallax

  constructor() { }

  ngOnInit() {
    /////Parallax Stuff/////////
    //Calculate Parallax height; 
    /*
    if(document.documentElement.clientHeight >= 600) {    //Desktop Screen
      this.parallaxHeight = document.documentElement.clientHeight;
    }
    else {                                                //Mobile Screen
      this.parallaxHeight = document.documentElement.clientHeight;
    }
    */
  }

}

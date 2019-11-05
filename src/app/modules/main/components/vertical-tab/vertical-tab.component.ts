import { Component, OnInit, Input } from '@angular/core';
import { tabVerticalSlide } from './vertical-tab.animation';

//Construct animations dynamically
import { AnimationStateMetadata, AnimationStyleMetadata } from '@angular/animations';
import { AnimationBuilder, trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'app-vertical-tab',
  templateUrl: './vertical-tab.component.html',
  styleUrls: ['./vertical-tab.component.css'],
  animations: [tabVerticalSlide]
})
export class VerticalTabComponent implements OnInit {

  @Input()
  public tabId: string;
  public index: number;
  public isShow: boolean;
  public isSelected: boolean;
  public slideVector: number = 0;          //distance and direction of tab slide
  public slideVectors: Array<number> = [];          //distance and direction of tab slide
  public state: string = "hide";

  constructor(private _builder : AnimationBuilder) { }

  ngOnInit() {

    let state1= state("test", style({width:0})), animate(1000, style({width:'100px'}))

    const myAnimation = this._builder.build([
      
      state("test", style({width:0})),
      animate(1000, style({width:'100px'}))
    ]);
  }

  /**
   * On selected
   * @param event 
   * @param id 
   */
  public openTab(event: Event, id: string) {

  }

}

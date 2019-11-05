import {
    trigger, animate, style, group, animateChild, query, stagger, transition, state
  } from '@angular/animations';

export const tabVerticalSlide0 = trigger('tabVerticalSlide0',[
    state('tab0', style({
      'border-right': '3px solid red',
      transform:'translateY(0px)'
    })),
    state('tab1', style({
      'border-right': '3px solid red',
      transform:'translateY(52px)'
    })),
    state('tab2', style({
      'border-right': '3px solid red',
      transform:'translateY(104px)'
    })),
    state('hide', style({
      'border-right': '3px solid red',
    })),
    transition('* => *', [
      animate("250ms cubic-bezier(0.645, 0.045, 0.355, 1)")
    ])
  ])
  
  export const tabVerticalSlide = trigger('tabVerticalSlide',[
    state('slideUp', style({
      'border-right': '3px solid red',
      transform:'translateY(-{{slideVector}})'
    })),
    state('neutral', style({
      'border-right': '3px solid red',
      transform: 'translateY({{slideVector}})'
    })),
    state('slideDown', style({
      'border-right': '3px solid red',
      transform:'translateY({{slideVector}} )'
    })),
    state('hide', style({
      'border-right': '3px solid red',
    })),
    transition('* => *', [
      animate("250ms cubic-bezier(0.645, 0.045, 0.355, 1)")
    ],
    {
      params: {slideVector: '0px'}  //Default Value needed
    })
  ])
  
  export const tabVerticalSlide2 = trigger('tabVerticalSlide2',[
    state('tab0', style({
      'border-right': '3px solid red',
      transform:'translateY(-104px)'
    })),
    state('tab1', style({
      'border-right': '3px solid red',
      transform:'translateY(-52px)'
    })),
    state('tab2', style({
      'border-right': '3px solid red',
      transform:'translateY(0px)'
    })),
    state('hide', style({
      'border-right': '3px solid red',
    })),
    transition('* => *', [
      animate("250ms cubic-bezier(0.645, 0.045, 0.355, 1)")
    ])
  ])
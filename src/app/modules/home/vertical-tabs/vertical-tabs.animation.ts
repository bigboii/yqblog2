import {
    trigger, animate, style, group, animateChild, query, stagger, transition, state, AnimationTriggerMetadata
  } from '@angular/animations';
  

export const verticalTabContentFadeIn = trigger('verticalTabContentFadeIn',[
  state('false', style({
    height: '0px', 
    opacity: 0, 
    display: 'none',
  })),
  state('true', style({
    height: '100%', 
    opacity: 1
  })),
  transition('false => true', [
    animate("250ms 0s linear")
  ]),
  transition('true => false', [
    animate("250ms 0s linear")
  ])
])

export const tabVerticalSlide = trigger('tabVerticalSlide',[

  state('tab0', style({
    height:'52px',
    'border-right': '3px solid green',
    transform:'translateY(0px)'
  })),
  state('tab1', style({
    height:'52px',
    'border-right': '3px solid green',
    transform:'translateY(52px)'
  })),
  state('tab2', style({
    height:'52px',
    'border-right': '3px solid green',
    transform:'translateY(104px)'
  })),
  transition('* => *', [
    animate("250ms cubic-bezier(0.645, 0.045, 0.355, 1)")
  ])
])

export function dynamicTabVerticalSlide( tabHeight: number, color: string): AnimationTriggerMetadata {
  return trigger( 'dynamicTabVerticalSlide', [
    state('tab0', style({
      height: tabHeight+'px',
      'border-right': '3px solid ' + color,
      transform:'translateY(0px)'
    })),
    state('tab1', style({
      height: tabHeight+'px',
      'border-right': '3px solid ' + color,
      transform:'translateY(88px)'
    })),
    state('tab2', style({
      height: tabHeight + 'px',
      'border-right': '3px solid ' + color,
      transform:'translateY(176px)'
    })),
    transition('* => *', [
      animate("200ms")
    ])
  ]);
}
import {
    trigger, animate, style, group, animateChild, query, stagger, transition, state
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
  
  export const tabVerticalSlide1 = trigger('tabVerticalSlide1',[
    state('tab0', style({
      'border-right': '3px solid red',
      transform:'translateY(-52px)'
    })),
    state('tab1', style({
      'border-right': '3px solid red',
      transform: 'translateY(0px)'
    })),
    state('tab2', style({
      'border-right': '3px solid red',
      transform:'translateY(52px)'
    })),
    state('hide', style({
      'border-right': '3px solid red',
    })),
    transition('* => *', [
      animate("250ms cubic-bezier(0.645, 0.045, 0.355, 1)")
    ])
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
  
  export const tabOmniSlide_backup = trigger('tabOmniSlide',[
    state('selected', style({
      'border-right': '3px solid red',
    })),
    state('selectedUp', style({
      'border-right': '3px solid red',
      // top:'50px',
      transform:'translateY(56px)'
    })),
    state('deSelectedUp', style({
      'border-right': '1px solid #ccc',
      // top:'0px',
      transform:'translateY(-56px)'
    })),
    state('selectedDown', style({
      'border-right': '3px solid red',
      // top:'-50px',
      transform:'translateY(56px)'
    })),
    state('deSelectedDown', style({
      'border-right': '1px solid #ccc',
      // top:'0px',
      transform:'translateY(56px)'
    })),
    state('hide', style({
      'border-right': '1px solid #ccc',
    })),
    transition('deselectedUp => selectedUp', [
      animate("3000ms ease-out")
    ]),
    transition('deselectedDown => selectedDown', [
      animate("3000ms ease-out")
    ]),
    transition('selectedUp => deselectedUp', [
      animate("3000ms ease-out")
    ]),
    transition('selectedDown => deSelectedDown', [
      animate("3000ms ease-out")
    ]),
  
    transition('deselectedUp => *', [
      animate("3000ms ease-out")
    ]),
    transition('deselectedDown => *', [
      animate("3000ms ease-out")
    ]),
  
    transition('selected => deselectedDown', [
      animate("3000ms ease-out")
    ]),
    transition('selected => deselectedUp', [
      animate("3000ms ease-out")
    ]),
  ])
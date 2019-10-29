import {
  trigger, animate, style, group, animateChild, query, stagger, transition, state
} from '@angular/animations';


/* 
https://stackblitz.com/edit/angular-route-transitions?embed=1&file=app/app.component.ts 
https://stackoverflow.com/questions/46287674/angular-4-leave-animation-not-triggering
*/
export const fadeTransition = trigger('fadeTransition', [
  // The '* => *' will trigger the animation to change between any two states
  transition('* => *', [
    // The query function has three params.
    // First is the event, so this will apply on entering or when the element is added to the DOM.
    // Second is a list of styles or animations to apply.
    // Third we add a config object with optional set to true, this is to signal
    // angular that the animation may not apply as it may or may not be in the DOM.
    query(
      ':enter',
      [style({ opacity: 0 })],
      { optional: true }
    ),
    query(
      ':leave',
      // here we apply a style and use the animate function to apply the style over 0.3 seconds
      [style({ opacity: 1 }), animate('300ms', style({ opacity: 0 }))],
      { optional: true }
    ),
    query(
      ':enter',
      [style({ opacity: 0 }), animate('300ms', style({ opacity: 1 }))],
      { optional: true }
    )
  ])
]);

export const revealParallaxAnimation = trigger('revealParallax',[
  state('false',style({
     opacity: 0
   })),
   state('true',style({
     opacity: 1
   })),
  transition('0 => 1', [
    animate("1000ms ease-in", style({ opacity: 1 }))
  ]),
  transition('1 => 0', [
    animate("1000ms ease-out", style({ opacity: 0 }))
  ])
])

export const fadeIn = trigger('fadeIn',[
  transition(':enter', 
  [
    style({opacity: 0}),
    animate("1000ms ease-out", style({opacity: 1})), 
  ])
])

export const fadeInOnClick = trigger('fadeInOnClick',[
  state('false', style({
    height: '0px', 
    opacity: 0, 
    display: 'none',
  })),
  state('true', style({
    height: '100%', 
    opacity: 0, 
    display: 'none',
  })),
 transition('false => true', [
   animate("333ms 0s ease-out")
 ])
])

export const slideUpFadeIn = trigger('slideUpFadeIn',[

  transition(':enter', [
    style({
     opacity: 0,
     transform: 'translateY(28px)'
    }),
    animate("333ms {{initialDelay}}s ease-out", style({opacity: 1, transform: 'translateY(0)'})), 
  ],
  {
    params: {initialDelay: '0'}  //Default Value needed
  })
])

export const slideDownFadeIn = trigger('slideDownFadeIn',[
  transition(':enter', [
      style({
       opacity: 0,
       transform: 'translateY(-24px)'
     }),
    animate("333ms {{initialDelay}}s ease-out", 
      style({
       opacity: 1,
       transform: 'translateY(0px)'
     }))
  ], 
  {
    params: {initialDelay: '0'}  //Default Value needed
  })
])

export const slideDownFadeIn2 = trigger('slideDownFadeIn2',[
  state('false', style({
     opacity: 0,
     transform: 'translateY(-24px)'
   })),
  state('true', style({
       opacity: 1,
       transform: 'translateY(0px)'
     })),
  transition('false => true', [
    animate("333ms {{initialDelay}}s ease-out")
  ], 
  {
    params: {initialDelay: '0'}  //Default Value needed
  })
])

export const revealOnScrollAnimation = trigger('sectionState',[
  state('false',style({
     opacity: 0,
     transform: 'translateY(-18px)'
     //position: 'relative',
   })),
   state('true',style({
     opacity: 1,
     transform:'translateY(18px)'
     //position:'relative',
     //top:0
   })),
  transition('false => true', [
    animate("500ms ease-out")
  ]),
  transition('true => false', [
    animate("500ms ease-out")
  ])
])

// export const sectionAnimation2 = trigger('sectionState4',[
//  transition('0 => 1', animate("5s ease-in")),
//  transition('1 => 0', animate("5s ease-out"))
// ])

// export const rotateAnimation =  trigger('rotate', [
//       transition(':enter', [style({transform: 'rotate(-4320deg)'}), animate('2000ms')])
//   ])

// export const flipHorizontal =  trigger('flipHorizontal', [
//       transition(':enter', [style({transform: 'rotateY(-4320deg)'}), animate('5000ms')])
//   ])


/*
  Vertical Tab Content animations
*/
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
    animate("0ms 0s ease-out")
  ]),
  transition('true => false', [
    animate("0ms 0s ease-out")
  ])
])

export const tabSlide = trigger('tabSlide',[
  state('false', style({
    'border-right': '1px solid #ccc'
  })),
  state('true', style({
    'border-right': '3px solid red'
  })),
  transition('false => true', [
    animate("333ms ease-out")
  ]),
  transition('true => false', [
    animate("333ms ease-out")
  ])
])

//https://www.w3schools.com/w3css/w3css_tabulators.asp
export const tabOmniSlide = trigger('tabOmniSlide',[
  state('selected', style({
    'border-right': '3px solid red',
  })),
  state('selectedUp', style({
    'border-right': '3px solid red',
    top:'50px'
  })),
  state('deSelectedUp', style({
    'border-right': '1px solid #ccc',
    top:'0px'
  })),
  state('selectedDown', style({
    'border-right': '3px solid red',
    top:'-50px'
  })),
  state('deSelectedDown', style({
    'border-right': '1px solid #ccc',
    top:'0px'
  })),
  state('hide', style({
    'border-right': '1px solid #ccc',
  })),
  transition('deselectedUp => selectedUp', [
    animate("333ms ease-out")
  ]),
  transition('deselectedDown => selectedDown', [
    animate("333ms ease-out")
  ]),
  transition('selectedUp => deselectedUp', [
    animate("333ms ease-out")
  ]),
  transition('selectedDown => deSelectedDown', [
    animate("333ms ease-out")
  ])
])
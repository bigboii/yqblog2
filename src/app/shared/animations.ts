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
    animate("1000ms ease-in", style({opacity: 1})), 
  ])
])

export const slideUpFadeIn = trigger('slideUpFadeIn',[
  state('false', style({
     opacity: 0,
     transform: 'translateY(28px)'
   })),
  state('true', style({
       opacity: 1,
       transform: 'translateY(-28px)'
     })),
  transition('false => true', [
    animate("333ms {{initialDelay}}s ease-in")
  ], 
  {
    params: {initialDelay: '0'}  //Default Value needed
  })
])

export const slideDownFadeIn = trigger('slideDownFadeIn',[
  state('false', style({
     opacity: 0,
     transform: 'translateY(-24px)'
   })),
  state('true', style({
       opacity: 1,
       transform: 'translateY(0px)'
     })),
  transition('false => true', [
    animate("333ms {{initialDelay}}s ease-in")
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
    animate("1000ms ease-in")
  ]),
  transition('true => false', [
    animate("1000ms ease-in")
  ])
])

export const sectionAnimation2 = trigger('sectionState4',[
 transition('0 => 1', animate("5s ease-in")),
 transition('1 => 0', animate("5s ease-out"))
])

export const rotateAnimation =  trigger('rotate', [
      transition(':enter', [style({transform: 'rotate(-4320deg)'}), animate('2000ms')])
  ])

export const flipHorizontal =  trigger('flipHorizontal', [
      transition(':enter', [style({transform: 'rotateY(-4320deg)'}), animate('5000ms')])
  ])

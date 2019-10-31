import { Directive, HostListener, ElementRef, ViewChild, Input, Output, Inject, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { revealOnScrollAnimation } from '../animations';

@Directive({
  selector: '[revealOnScroll]'
})
export class RevealonscrollDirective implements OnInit, OnDestroy {

  //@ViewChild('sectionAbout') section: ElementRef;

  //public windowHeight: string;
  public windowWidth: string;
  public win_height_padded: number;
  public switchedOn : boolean = true;
  private startOfContent;
  private startOfContent2;

  private elementView;
  private windowHeight;

  private timer;

  @Input() public index: number;
  @Output() public showSection: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: Document) {

    //this.windowHeight = (window.screen.height) + "px";
    //this.windowWidth = (window.screen.width) + "px";
    //this.win_height_padded = (window.screen.height) * 1.1;

  }

  ngOnInit() {
    //let bodyRect = document.body.getBoundingClientRect();
    //let rect = this.elementRef.nativeElement.getBoundingClientRect();
    //console.log("[onContentScroll] index added -> " + this.index);

    //Constantly listen to content scrolling inside "mat-sidenav-content"
    this.document.querySelector('mat-sidenav-content')
                                 .addEventListener('scroll', this.onContentScroll.bind(this));

     this.elementView = this.elementRef.nativeElement.getBoundingClientRect();
     this.startOfContent = this.elementRef.nativeElement.getBoundingClientRect().top;

     this.windowHeight = window.innerHeight;

     this.showSection.emit({
        "index": this.index,
        "state": false
      });

     //console.log("[REVEALONSCROLL] ngOnInit");
  }

  ngOnDestroy() {
    //unsubscribe
    this.document.querySelector('mat-sidenav-content').removeEventListener('scroll', this.onContentScroll);
  }

  onContentScroll(event) {

    if(this.timer) {
      window.clearTimeout(this.timer);
    }

    this.timer = window.setTimeout(function() {

      }, 1000);
        
    //activate event when scrolled to its designated element
    if( (event.srcElement.scrollTop + this.windowHeight) >= this.startOfContent ) 
    {
      if(this.index === 0) {
        //console.log("<" + this.index + ">" + "[revealOnScroll] designated element reached");
      }
      if(this.switchedOn) {
        this.switchedOn = false;
        if(this.index === 0) {
          //console.log("<" + this.index + ">" + "[revealOnScroll] this.switchedOn TRUE");
        }
      }

      this.showSection.emit({
        "index": this.index,
        "state": true
      });
    }
    // else {
    //   this.showSection.emit({
    //     "index": this.index,
    //     "state": false
    //   });
    // }

  }
}

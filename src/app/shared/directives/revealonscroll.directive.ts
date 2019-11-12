import { Directive, HostListener, ElementRef, ViewChild, Input, AfterViewInit, Output, Inject, EventEmitter, OnInit, OnDestroy} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { revealOnScrollAnimation } from '../animations';

@Directive({
  selector: '[revealOnScroll]'
})
export class RevealonscrollDirective implements OnInit, AfterViewInit, OnDestroy {

  //@ViewChild('sectionAbout') section: ElementRef;

  //public windowHeight: string;
  public windowWidth: string;
  public win_height_padded: number;
  public switchedOn : boolean = true;
  private posY;
  private startOfContent2;

  private elementView;
  private windowHeight;

  private timer;

  @Input() public index: number;
  @Output() public showSection: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: Document) {

  }

  ngOnInit() {
    //Constantly listen to content scrolling inside "mat-sidenav-content"
    // this.document.querySelector('mat-sidenav-content')
    //                              .addEventListener('scroll', this.onContentScroll.bind(this));

    window.addEventListener('scroll', this.onContentScroll.bind(this));
  }

  ngAfterViewInit() {
    
    this.elementView = this.elementRef.nativeElement.getBoundingClientRect();
    this.posY = this.getYPosition(this.elementRef);
    // this.posY = this.elementRef.nativeElement.getBoundingClientRect().top;
    // console.log("this.elementView.nativeElement.children[0].offsetTop: " + this.elementView.nativeElement.children);

    this.windowHeight = window.innerHeight;

    this.showSection.emit({
       "index": this.index,
       "state": false
     });
  }

  ngOnDestroy() {
    //unsubscribe
    // this.document.querySelector('mat-sidenav-content').removeEventListener('scroll', this.onContentScroll);
    window.removeEventListener('scroll', this.onContentScroll);
  }

  onContentScroll(event) {
    // if(this.index == 3) {
    //   console.log("============================================");
    //   console.log("window.pageYOffset: " + (window.pageYOffset + window.innerHeight));
    //   console.log("this.posY: " + this.posY);
    //   console.log("============================================");
    // }
   
    if(this.timer) {
      window.clearTimeout(this.timer);
    }

    this.timer = window.setTimeout(function() {

      }, 1000);
        
    //activate event when scrolled to its designated element
    if( (window.scrollY + this.windowHeight) >= (this.posY + 150 + 36) ) {  // verticalY + padding + h1.height
    
      if(this.switchedOn) {
        this.switchedOn = false;
      }

      this.showSection.emit({
        "index": this.index,
        "state": true
      });
    }
  }

  getYPosition(el:ElementRef){
    let offsetTop = 0;

    let nativeElement = el.nativeElement;

    while(nativeElement){
        offsetTop += nativeElement.offsetTop;
        nativeElement = nativeElement.offsetParent;
    }
    
    return offsetTop;
  }
}

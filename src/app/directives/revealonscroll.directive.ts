import { Directive, HostListener, ElementRef, ViewChild, Input, Output, Inject, EventEmitter, OnInit, AfterViewInit} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { revealOnScrollAnimation } from '../animations';

@Directive({
  selector: '[revealOnScroll]'
})
export class RevealonscrollDirective implements OnInit, AfterViewInit {

  //@ViewChild('sectionAbout') section: ElementRef;

  public windowHeight: string;
  public windowWidth: string;
  public win_height_padded: number;
  public switchedOn :boolean = true;

  @Input() public index: number;
  @Output() public showSection: EventEmitter<any> = new EventEmitter();

  constructor(private elementRef: ElementRef, @Inject(DOCUMENT) private document: Document) { 

    this.windowHeight = (window.screen.height) + "px";
    this.windowWidth = (window.screen.width) + "px";
    this.win_height_padded = (window.screen.height) * 1.1;

  }

  ngOnInit() {
    let bodyRect = document.body.getBoundingClientRect();
    let rect = this.elementRef.nativeElement.getBoundingClientRect();
  }


  ngAfterViewInit() {
    this.document.querySelector('mat-sidenav-content')
                                 .addEventListener('scroll', this.onContentScroll.bind(this));
  }

  onContentScroll(event){
    //console.log("[onContentScroll]");

    let scrolled = window.pageYOffset;
    let rect = this.elementRef.nativeElement.getBoundingClientRect();
    let elementOffsetTop = this.elementRef.nativeElement.offsetTop;

    let startOfContent = document.documentElement.clientHeight;

    if( rect.top <= startOfContent ) 
    { 
      if(this.switchedOn) {
        this.switchedOn = false;
      }

      this.showSection.emit({
        "index": this.index,
        "state": true
      });
    }
    else {
      this.showSection.emit({
        "index": this.index,
        "state": false
      });
    }
  }

  //
  //https://stackoverflow.com/questions/47528852/angular-material-sidenav-cdkscrollable/50812763#50812763



  @HostListener('window:scroll', ['$event'])     //window:scroll
  public onScroll($event:Event):void {

    console.log("[scrolled]: event: " + $event);
    //this.elementScrollEvent($event);

    //console.log("[scrolling] : " + $event.srcElement.scrollLeft, $event.srcElement.scrollTop);
    //console.log("[revealOnScroll]");
    let scrolled = window.pageYOffset;
    let rect = this.elementRef.nativeElement.getBoundingClientRect();
    let elementOffsetTop = this.elementRef.nativeElement.offsetTop;

    let startOfContent = document.documentElement.clientHeight;

    if( rect.top <= startOfContent ) 
    { 
      if(this.switchedOn) {
        this.switchedOn = false;
      }

      this.showSection.emit({
        "index": this.index,
        "state": true
      });
    }
    else {
      this.showSection.emit({
        "index": this.index,
        "state": false
      });
    }

  }

}

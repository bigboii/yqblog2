import { Directive, HostListener, ElementRef, ViewChild, Input, Output, Inject, EventEmitter, OnInit} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { revealOnScrollAnimation } from '../animations';

//https://www.youtube.com/watch?v=TfDK-KLq0Ks
//http://blog.webbb.be/trigger-css-animation-scroll/


//NOTE: window height vs brower height

@Directive({
  selector: '[revealOnScroll]'
})
export class RevealonscrollDirective implements OnInit {

  @ViewChild('sectionAbout') section: ElementRef;

  public windowHeight: string;
  public windowWidth: string;
  public win_height_padded: number;
  public switchedOn :boolean = true;

  @Input() public index: number;
  @Output() public showSection: EventEmitter<any> = new EventEmitter();

  constructor(private _el: ElementRef, @Inject(DOCUMENT) private document: Document) { 

    this.windowHeight = (window.screen.height) + "px";
    this.windowWidth = (window.screen.width) + "px";
    this.win_height_padded = (window.screen.height) * 1.1;

  }

  ngOnInit() {
    let bodyRect = document.body.getBoundingClientRect();
    let rect = this._el.nativeElement.getBoundingClientRect();
  }

  //
  //https://stackoverflow.com/questions/47528852/angular-material-sidenav-cdkscrollable/50812763#50812763

  @HostListener('window:scroll', ['$event'])     //window:scroll
  public onScroll($event:Event):void {

    console.log("[scrolled]: event: " + $event);
    //this.elementScrollEvent($event);

    console.log("[scrolling] : " + $event.srcElement.scrollLeft, $event.srcElement.scrollTop);
    console.log("[revealOnScroll]");
    let scrolled = window.pageYOffset;
    let rect = this._el.nativeElement.getBoundingClientRect();
    let elementOffsetTop = this._el.nativeElement.offsetTop;

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

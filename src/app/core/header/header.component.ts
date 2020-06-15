import { Component, AfterViewInit, Input, EventEmitter, Inject, ElementRef, ViewChild} from '@angular/core';
import { ToggleService } from '../../shared/services/toggle.service';
import { ThemeService } from '../../shared/services/theme.service';
import { ContentScrollListenerService } from '../../shared/services/contentscrolllistener.service';
import { MatSidenav } from '@angular/material/sidenav';
import { revealOnScrollAnimation, slideDownFadeIn, fadeIn } from '../../shared/animations';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [slideDownFadeIn, fadeIn]
})
export class HeaderComponent implements AfterViewInit {

  @Input() private logoPath;
  @ViewChild('headerToolbar', {static:false, read: ElementRef}) private matToolbarElem: ElementRef;
  private scrollSubscription;

  constructor(private toggleService: ToggleService,
              private themeService : ThemeService,
              private contentScrollService: ContentScrollListenerService,
              private elementRef: ElementRef,
              @Inject(DOCUMENT) private document: Document) {
  }

  ngAfterViewInit() {
    this.contentScrollService.startListeningToScrolling();
    this.scrollSubscription = this.contentScrollService.getScrollEventSubject().subscribe(scrollEvent => { console.log("event fired 2"); this.onContentScroll2(scrollEvent) });
    this.document.body.addEventListener('scroll', this.onContentScroll2.bind(this));   //testing

    // document.addEventListener("wheel", function(event) {   //testing
    //     console.log(event);
    // });
  }

  toggleActive:boolean = false;

  toggleSidenav() {
    this.toggleService.toggle();
  }

  toggleNightmode() {
    this.themeService.toggleTheme();
  }


  //SECTION
  @Input() public index: number;
  public isElevated: boolean = false;
  public switchedOn :boolean = true;
  public elevationValue = 0

  onContentScroll2(event) {    
    // if( window.scrollY > this.matToolbarElem.nativeElement.clientHeight)
    // console.log("[HEADER]");
    // console.dir(event);
    if( event.target.scrollTop > this.matToolbarElem.nativeElement.clientHeight) 
    // if( event['sT']> this.matToolbarElem.nativeElement.clientHeight) 
    {
      if(this.isElevated) {
        this.isElevated = false;
      }

      this.isElevated = true;
      this.elevationValue = 4;
      
    }
    else {
      this.isElevated = false;
      this.elevationValue = 0;
    }
  }
}

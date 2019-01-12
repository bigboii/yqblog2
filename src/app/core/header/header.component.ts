import { Component, OnInit, AfterViewInit, Input, EventEmitter, Inject, ElementRef} from '@angular/core';
import { ToggleService } from '../../shared/services/toggle.service';
import { ThemeService } from '../../shared/services/theme.service';
import { MatSidenav } from '@angular/material';
//import { ContentScrollListenerService } from '../services/contentscrolllistener.service';

//ContentScrollStuff
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, AfterViewInit {

  @Input() logoPath;

  public contentScrollEvent;
  public currentScrollPosition;

  constructor(public toggleService: ToggleService,
              public themeService : ThemeService,
              private elementRef: ElementRef,
              @Inject(DOCUMENT) private document: Document) { }

  ngOnInit() {

  }

  ngAfterViewInit() {

    //Possibly don't need below lines

    //Constantly listen to content scrolling inside "mat-sidenav-content"
    this.document.querySelector('mat-sidenav-content')
                                 .addEventListener('scroll', this.onContentScroll.bind(this));
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

  onContentScroll(event) {
    //console.log("[header scroll]");
    //console.log("[header.component : onContentScroll] ");
    //console.dir(event);
    let scrolled = window.pageYOffset;
    let rect = this.elementRef.nativeElement.getBoundingClientRect().top;
    let elementOffsetTop = this.elementRef.nativeElement.offsetTop;

    let elem = document.getElementsByClassName('parallax-bg')[0].getBoundingClientRect();
    //console.dir(elem);

    if( elem.top < 64 ) 
    {
      if(this.isElevated) {
        this.isElevated = false;
      }

      this.isElevated = true;
      this.elevationValue = 8;
    }
    else {
      this.isElevated = false;
      this.elevationValue = 0;
    }
  }


}

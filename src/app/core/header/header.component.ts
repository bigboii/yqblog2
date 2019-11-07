import { Component, AfterViewInit, Input, EventEmitter, Inject, ElementRef, ViewChild} from '@angular/core';
import { ToggleService } from '../../shared/services/toggle.service';
import { ThemeService } from '../../shared/services/theme.service';
import { MatSidenav } from '@angular/material';
import { revealOnScrollAnimation, slideDownFadeIn, fadeIn } from '../../shared/animations';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [slideDownFadeIn, fadeIn]
})
export class HeaderComponent implements AfterViewInit {

  @Input() logoPath;

  public contentScrollEvent;
  public currentScrollPosition;
  // public state: boolean;

  @ViewChild('headerToolbar', {static: false}) matToolbarElem: ElementRef;
  //public elem;


  constructor(public toggleService: ToggleService,
              public themeService : ThemeService,
              private elementRef: ElementRef,
              @Inject(DOCUMENT) private document: Document) {

  }

  ngAfterViewInit() {
    this.document.querySelector('mat-sidenav-content')
                                 .addEventListener('scroll', this.onContentScroll.bind(this));
    console.log("[HEADER] ngAfterViewInit(): ");
    console.dir(this.matToolbarElem);
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
    let elem = document.getElementsByClassName('parallax-bg')[0].getBoundingClientRect();
    
    console.log("[header] elem.top: " + elem.top);
    console.log("[header] matToolbar height: " + this.matToolbarElem.nativeElement.offsetHeight);
    if( elem.top < this.matToolbarElem.nativeElement.offsetHeight ) 
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

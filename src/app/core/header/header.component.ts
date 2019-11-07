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

  @Input() private logoPath;
  @ViewChild('headerToolbar', {static:false, read: ElementRef}) private matToolbarElem: ElementRef;
  private contentScrollEvent;
  private currentScrollPosition;
  private elemParallax;

  constructor(private toggleService: ToggleService,
              private themeService : ThemeService,
              private elementRef: ElementRef,
              @Inject(DOCUMENT) private document: Document) {

  }

  ngAfterViewInit() {
    this.document.querySelector('mat-sidenav-content')
                                 .addEventListener('scroll', this.onContentScroll.bind(this));
    this.elemParallax = document.getElementsByClassName('parallax-bg')[0];
    console.log("[header] ngAFterViewInit: " + this.elemParallax);
    console.dir(this.elemParallax);
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

    if(this.elemParallax === undefined) {
      this.elemParallax = document.getElementsByClassName('parallax-bg')[0];
    }

    console.dir(this.elemParallax);
    console.log(this.elemParallax.getBoundingClientRect().top);
    if( this.elemParallax.getBoundingClientRect().top < this.matToolbarElem.nativeElement.clientHeight) 
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

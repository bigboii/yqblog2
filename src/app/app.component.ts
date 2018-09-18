import { Component, HostBinding, OnInit, AfterViewInit} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  @HostBinding('class') componentCssClass;

  title = 'app';

  private appTheme: string;
  public logoPath: string;

  constructor(public themeService : ThemeService) {
  }

  ngOnInit(): void {
    this.themeService.currentTheme.subscribe(theme => { this.componentCssClass = theme; console.log("change detected: " + this.appTheme);});
    this.themeService.currentLogo.subscribe(logo => this.logoPath = logo);

    //this.componentCssClass = this.appTheme;
    
  }

  ngAfterViewInit(): void {
    console.log("[app] ngAfterViewInit");
    console.log(this.componentCssClass);
  }
}

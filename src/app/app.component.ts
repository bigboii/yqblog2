import { Component, HostBinding, OnInit} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { ThemeService } from './shared/services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @HostBinding('class') componentCssClass;

  title = 'app';

  private appTheme: string;
  public logoPath: string;

  constructor(public themeService : ThemeService) {
  }

  ngOnInit(): void {
    this.themeService.currentTheme.subscribe(theme => { this.componentCssClass = theme; console.log("change detected: " + theme);});
    this.themeService.currentLogo.subscribe(logo => this.logoPath = logo);    
  }

}

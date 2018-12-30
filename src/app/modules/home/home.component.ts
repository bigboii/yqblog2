import { Component, HostBinding, OnInit } from '@angular/core';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @HostBinding('class') componentCssClass;

  title = 'app';

  private appTheme: string;
  public logoPath: string;

  constructor(public themeService : ThemeService) {
  }

  ngOnInit(): void {
    this.themeService.currentTheme.subscribe(theme => { this.componentCssClass = theme; console.log("change detected: " + this.appTheme);});
    this.themeService.currentLogo.subscribe(logo => this.logoPath = logo);    
  }

}

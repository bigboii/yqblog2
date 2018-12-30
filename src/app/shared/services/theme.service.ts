import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/*
  Theme Toggling service that switches between light mode and darkmode
*/

@Injectable(
  {
    providedIn: 'root'    //make ThemeService a singleton
  }
)
export class ThemeService {

  private themeSource = new BehaviorSubject<string>("light-theme");
  private logoSource = new BehaviorSubject<string>("assets/imgs/q2-logo-color_white.png");
  currentTheme = this.themeSource.asObservable();
  currentLogo = this.logoSource.asObservable();

  constructor() {

  }

  private isNightmode: boolean = false;
  private logoPath: string = "assets/imgs/q2-logo-color_white.png";

  toggleTheme (){

    if(this.isNightmode) {             //Nightmode ON
      this.isNightmode = false;
      this.themeSource.next("light-theme");
      this.logoSource.next("assets/imgs/q2-logo-color_white.png");
    }
    else {                             //Nightmode OFF
      this.isNightmode = true;
      this.themeSource.next("dark-theme");
      this.logoSource.next("assets/imgs/q2-logo-color_black.png");
    }
  }
}

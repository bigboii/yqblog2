import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
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

//https://stackoverflow.com/questions/48645540/how-to-get-and-set-access-and-modify-a-global-variable-between-components
//https://stackoverflow.com/questions/46845230/javascript-angular-4-change-ngclass-from-another-component

  private themeSource = new BehaviorSubject<string>("light-theme");
  private logoSource = new BehaviorSubject<string>("assets/imgs/q2-logo-color_white.png");
  currentTheme = this.themeSource.asObservable();
  currentLogo = this.logoSource.asObservable();


  constructor() {

  }

  private isNightmode: boolean = false;
  private logoPath: string = "assets/imgs/q2-logo-color_white.png";

  toggleTheme (){
    console.log("[ThemeService] toggleTheme");
    if(this.isNightmode) {             //Nightmode ON
      this.isNightmode = false;
      this.themeSource.next("light-theme");
      this.logoSource.next("assets/imgs/q2-logo-color_black.png");

      /*
      return {
        "theme":"light-theme",
        "logoPath":"assets/imgs/q2-logo-color_black.png"  
        };
      */
    }
    else {                             //Nightmode OFF
      console.log("2");
      this.isNightmode = true;
      this.themeSource.next("dark-theme");
      this.logoSource.next("assets/imgs/q2-logo-color_white.png");
      /*
      return {
        "theme":"dark-theme",
        "logoPath":"assets/imgs/q2-logo-color_white.png"
      };
      */
    }
  }
}

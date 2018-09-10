import { Component, HostBinding, Renderer2, ElementRef} from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @HostBinding('class') componentCssClass;

  title = 'app';
  isNightmode = true;
  theme;
  logoPath = "assets/imgs/q2-logo-color_white.png";

  constructor(private renderer: Renderer2, private el: ElementRef) {
  }

  ngOnInit(): void {

  }

  onNightmodeToggled (){
    console.log("isNightmode: " + this.isNightmode);
    if(this.isNightmode) {
      console.log("Nightmode On");
      this.isNightmode = false;
      this.theme = "dark-theme";
      this.componentCssClass = this.theme;
      this.logoPath = "assets/imgs/q2-logo-color_black.png";
      //this.renderer.addClass(document.body, 'dark-theme');
    }
    else {
      console.log("Nightmode Off");
      this.isNightmode = true;
      this.theme = "light-theme";
      this.componentCssClass = this.theme;
      this.logoPath = "assets/imgs/q2-logo-color_white.png";
      //this.renderer.addClass(document.body, 'my-app-theme');
    }
  }
}

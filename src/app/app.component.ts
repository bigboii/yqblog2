import { Component, HostBinding} from '@angular/core';
import { MatSidenav } from '@angular/material';
import { OverlayContainer } from '@angular/cdk/overlay';

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

  constructor(public overlayContainer: OverlayContainer) {
  }

  ngOnInit(): void {

  }

  onNightmodeToggled (){
    console.log("isNightmode: " + this.isNightmode);
    if(this.isNightmode) {
      console.log("Nightmode On");
      this.isNightmode = false;
      this.theme = "dark-theme";
      this.overlayContainer.getContainerElement().classList.add("dark-theme");
      this.componentCssClass = this.theme;
    }
    else {
      console.log("Nightmode Off");
      this.isNightmode = true;
      this.theme = "my-app-theme";
      this.overlayContainer.getContainerElement().classList.add("my-app-theme");
      this.componentCssClass = this.theme;
    }
  }
}

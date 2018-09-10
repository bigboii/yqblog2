import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Injectable(
//{
  //providedIn: 'root'        //make ToggleService a singleton (angular 6 way)
//}
)
export class ToggleService {

  private sidenav: MatSidenav;

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    return this.sidenav.open();
  }

  public close() {
    return this.sidenav.close();
  }

  public toggle(): void {
    console.log("[ToggleService]: toggle() called");
    this.sidenav.toggle();
  }
}

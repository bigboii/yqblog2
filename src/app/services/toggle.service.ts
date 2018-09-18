import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material';

/**
  Service that allows external component to activate sidenav's toggle
*/

@Injectable(
  {
    providedIn: 'root'        //make ToggleService a singleton
  }
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

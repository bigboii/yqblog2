import { Component, OnInit, ViewChild  } from '@angular/core';
import { ToggleService } from '../toggle.service';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {

  @ViewChild('drawer') 
  public sidenav: MatSidenav;

  navItems = ["Home", "About", "Projects", "Test"];
 
 
  constructor(private toggleService: ToggleService) { }

  ngOnInit() {
      this.toggleService.setSidenav(this.sidenav);
  }
}

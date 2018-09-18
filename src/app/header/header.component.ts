import { Component, OnInit, Input, EventEmitter} from '@angular/core';
import { ToggleService } from '../services/toggle.service';
import { ThemeService } from '../services/theme.service';
import { MatSidenav } from '@angular/material';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() logoPath;

  constructor(public toggleService: ToggleService,
              public themeService : ThemeService) { }

  ngOnInit() {

  }

  toggleActive:boolean = false;

  toggleSidenav() {
    this.toggleService.toggle();
  }

  toggleNightmode() {
    this.themeService.toggleTheme();
  }
}

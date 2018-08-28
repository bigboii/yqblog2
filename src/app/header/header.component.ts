import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { ToggleService } from '../toggle.service';
import { MatSidenav } from '@angular/material';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() nightmodeToggled = new EventEmitter();

  constructor(public toggleService: ToggleService) { }

  ngOnInit() {

  }

  toggleActive:boolean = false;

  toggleSidenav() {
    this.toggleService.toggle();
  }

  toggleNightmode() {
    this.nightmodeToggled.emit();
  }

}

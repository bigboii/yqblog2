import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-featcard',
  templateUrl: './featcard.component.html',
  styleUrls: ['./featcard.component.css']
})
export class FeatcardComponent implements OnInit {

  @Input() cardData;

  constructor() { }

  ngOnInit() {

  }

}

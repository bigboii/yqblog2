import { Component, OnInit, AfterViewInit, Input, HostBinding } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, AfterViewInit {

  @Input() public contentHeight: number;
  @Input() public footerPosition: number;
  //public footerPosition: number;

  //@HostBinding('style') componentCssStyle;
  
  constructor() { }

  ngOnInit() {
    //console.log("footer's contentHeight: " + this.contentHeight);
    //this.footerPosition = this.contentHeight - 64;
    //console.log("footer's footerPosition: " + this.footerPosition);

    //console.log("footer's css this.componentCssStyle.top: " + this.componentCssStyle.top.px);
    //this.componentCssStyle.top.px = this.footerPosition;
    //console.log(this.componentCssStyle);
    //console.dir(this.componentCssStyle);
  }

  ngAfterViewInit() {
    //this.componentCssStyle.top.px = this.footerPosition;
  }

}

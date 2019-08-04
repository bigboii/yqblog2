import { AfterViewInit, Directive, ElementRef, HostBinding, Input } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Directive({
  selector: '[scroll-reveal]'
})
export class ScrollRevealDirective {

  @HostBinding('style.visibility')
  visibility = 'hidden';

  constructor(private elementRef: ElementRef) { }

}

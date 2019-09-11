import { Directive, HostBinding, ElementRef, HostListener, Input, Renderer2, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[elevateOnHover]'
})
export class ElevateOnHoverDirective  {

  // @Input()
  defaultElevation = '2';

  // @Input()
  raisedElevation = '8';

  @HostBinding('style.z-index')
  elevation = '2';

  constructor(
    // private element: ElementRef,
    // private renderer: Renderer2
  ) {
    // this.setElevation(this.defaultElevation);
  }

  // ngOnChanges(_changes: SimpleChanges) {
  //   this.elevation = this.defaultElevation;
  // }

  @HostListener('mouseenter')
  public onMouseEnter(event : Event) {
    console.log("[hoverOnElevate] mouseEnter");
    this.elevation = '2';
  }

  @HostListener('mouseleave')
  public onMouseLeave(event : Event) {
    console.log("[hoverOnElevate] mouseLeave");
    this.elevation = '8';
  }

  // setElevation(amount: number) {
  //   // remove all elevation classes
  //   const classesToRemove = Array.from((<HTMLElement>this.element.nativeElement).classList).filter(c => c.startsWith('mat-elevation-z'));
  //   classesToRemove.forEach((c) => {
  //     this.renderer.removeClass(this.element.nativeElement, c);
  //   });

  //   // add the given elevation class
  //   const newClass = `mat-elevation-z${amount}`;
  //   this.renderer.addClass(this.element.nativeElement, newClass);
  // }

}

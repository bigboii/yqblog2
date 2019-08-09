import { isPlatformBrowser } from '@angular/common';
import { OnInit, AfterViewInit, Directive, ElementRef, HostBinding, Input } from '@angular/core';


/**
  Defer Load Directive
  Lazy Loading images:
    Instead of loading these resources as soon as the page loads, which is what normally happens, 
    the loading of these resources is put off till the moment the user actually needs to view them.

  https://imagekit.io/blog/lazy-loading-images-complete-guide/
  https://medium.com/@realTomaszKula/lazy-load-images-in-30-lines-of-code-3fe801223ffa

*/
@Directive({
  selector: '[lazy-load]'
})
export class LazyloadDirective implements OnInit, AfterViewInit {
  @HostBinding('attr.src') srcAttr = null;
  @Input() src: string;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    console.log("[LazyLoad] oninit");
    this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
  }

  ngAfterViewInit() {
    //this.canLazyLoad() ? this.lazyLoadImage() : this.loadImage();
  }

  private canLazyLoad() {
    return window && 'IntersectionObserver' in window;
  }

  private lazyLoadImage() {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(({ isIntersecting }) => {
        if (isIntersecting) {
          this.loadImage();
          obs.unobserve(this.el.nativeElement);
        }
      });
    });
    obs.observe(this.el.nativeElement);
  }

  private loadImage() {
    this.srcAttr = this.src;
  }
}
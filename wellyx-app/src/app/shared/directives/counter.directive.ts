import { Directive, ElementRef, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[data-count]',
  standalone: true,
})
export class CounterDirective implements OnInit, OnDestroy {
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const element = this.el.nativeElement;
    const target = parseInt(element.getAttribute('data-count') || '0', 10);
    const suffix = element.getAttribute('data-suffix') || '';

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !entry.target.getAttribute('data-animated')) {
            entry.target.setAttribute('data-animated', 'true');
            this.animate(element, target, suffix);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.observer.observe(element);
  }

  private animate(el: HTMLElement, target: number, suffix: string): void {
    const duration = 2000;
    const start = performance.now();

    const update = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

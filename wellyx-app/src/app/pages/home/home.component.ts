import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactFormComponent } from '../../shared/contact-form/contact-form.component';
import { CounterDirective } from '../../shared/directives/counter.directive';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';
import { NavbarService } from '../../shared/navbar/navbar.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, FadeInDirective, CounterDirective, ContactFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  contactSubject = 'New inquiry — Noshahi Developers Inc. website (Homepage)';
  contactHash = '#contact';

  activeFilter = 'all';
  private heroCarousel?: HTMLElement;
  private onHeroSlide?: (e: Event) => void;

  portfolioFilters = [
    { id: 'all', label: 'All' },
    { id: 'web', label: 'Web Apps' },
    { id: 'mobile', label: 'Mobile Apps' },
    { id: 'enterprise', label: 'Enterprise' },
    { id: 'ai', label: 'AI Solutions' },
  ];

  constructor(private navbarService: NavbarService) {}

  ngAfterViewInit(): void {
    this.heroCarousel = document.getElementById('heroCarousel') ?? undefined;
    if (this.heroCarousel) {
      this.updateNavbarForSlide(this.heroCarousel.querySelector('.carousel-item.active'));
      this.onHeroSlide = (e: Event) => {
        const event = e as CustomEvent & { relatedTarget?: HTMLElement };
        this.updateNavbarForSlide(event.relatedTarget ?? null);
      };
      this.heroCarousel.addEventListener('slid.bs.carousel', this.onHeroSlide);
    }
  }

  ngOnDestroy(): void {
    this.navbarService.heroDark.set(false);
    if (this.heroCarousel && this.onHeroSlide) {
      this.heroCarousel.removeEventListener('slid.bs.carousel', this.onHeroSlide);
    }
  }

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  isPortfolioVisible(category: string): boolean {
    return this.activeFilter === 'all' || this.activeFilter === category;
  }

  private updateNavbarForSlide(slide: Element | null): void {
    this.navbarService.heroDark.set(!!slide?.querySelector('.hero-slide-dark'));
  }
}

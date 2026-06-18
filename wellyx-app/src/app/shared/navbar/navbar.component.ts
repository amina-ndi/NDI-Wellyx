import { Component, ElementRef, HostListener, OnInit, ViewChild, effect } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarService } from './navbar.service';

declare const bootstrap: { Collapse: { getInstance: (el: Element) => { hide: () => void } | null } };

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  @ViewChild('navbarCollapse') navbarCollapse?: ElementRef<HTMLElement>;

  scrolled = false;
  isHome = false;
  heroDark = false;

  constructor(
    private router: Router,
    private navbarService: NavbarService
  ) {
    effect(() => {
      this.heroDark = this.navbarService.heroDark();
    });
  }

  ngOnInit(): void {
    this.updateRouteState();
    this.router.events.pipe(filter((e) => e instanceof NavigationEnd)).subscribe(() => {
      this.updateRouteState();
      this.updateScrolled();
    });
    this.updateScrolled();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.updateScrolled();
  }

  private updateRouteState(): void {
    this.isHome = this.router.url === '/' || this.router.url.startsWith('/?');
    if (!this.isHome) {
      this.scrolled = true;
    }
  }

  private updateScrolled(): void {
    if (this.isHome && window.scrollY <= 50) {
      this.scrolled = false;
      return;
    }
    this.scrolled = window.scrollY > 50;
  }

  closeNav(): void {
    const el = this.navbarCollapse?.nativeElement;
    if (el?.classList.contains('show')) {
      bootstrap.Collapse.getInstance(el)?.hide();
    }
  }

  collapseNav(): void {
    // Bootstrap handles toggle via data attributes
  }
}

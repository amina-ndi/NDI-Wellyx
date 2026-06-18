import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [RouterLink, FadeInDirective],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css',
})
export class PortfolioComponent {
  activeFilter = 'all';

  portfolioFilters = [
    { id: 'all', label: 'All' },
    { id: 'education', label: 'Education' },
    { id: 'healthcare', label: 'Healthcare' },
    { id: 'enterprise', label: 'Enterprise' },
    { id: 'ai', label: 'AI' },
    { id: 'ecommerce', label: 'E-Commerce' },
  ];

  setFilter(filter: string): void {
    this.activeFilter = filter;
  }

  isVisible(category: string): boolean {
    return this.activeFilter === 'all' || this.activeFilter === category;
  }
}

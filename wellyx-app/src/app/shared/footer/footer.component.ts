import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css',
})
export class FooterComponent {
  newsletterEmail = '';
  newsletterInvalid = false;

  onNewsletterSubmit(event: Event): void {
    event.preventDefault();
    const email = this.newsletterEmail.trim();
    if (email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert('Thank you for subscribing!');
      this.newsletterEmail = '';
      this.newsletterInvalid = false;
    } else {
      this.newsletterInvalid = true;
    }
  }
}

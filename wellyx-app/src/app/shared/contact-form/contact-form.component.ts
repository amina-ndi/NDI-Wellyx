import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css',
})
export class ContactFormComponent implements OnInit {
  @Input() subject = 'New inquiry — Noshahi Developers Inc. website';
  @Input() redirectHash = '';
  @Input() showTitle = false;
  @Input() showExtendedFields = false;

  @ViewChild('nameInput') nameInput?: ElementRef<HTMLInputElement>;
  @ViewChild('emailInput') emailInput?: ElementRef<HTMLInputElement>;
  @ViewChild('messageInput') messageInput?: ElementRef<HTMLTextAreaElement>;

  nextUrl = '';
  showSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buildNextUrl();
    if (this.route.snapshot.queryParamMap.get('success') === '1') {
      this.showSuccess = true;
      if (this.redirectHash) {
        setTimeout(() => {
          document.querySelector(this.redirectHash)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      this.router.navigate([], {
        relativeTo: this.route,
        fragment: this.redirectHash.replace('#', '') || undefined,
        queryParams: {},
        replaceUrl: true,
      });
    }
  }

  onSubmit(event: Event): void {
    const form = event.target as HTMLFormElement;
    form.querySelectorAll('.is-invalid').forEach((el) => el.classList.remove('is-invalid'));

    let valid = true;
    const name = this.nameInput?.nativeElement;
    const email = this.emailInput?.nativeElement;
    const message = this.messageInput?.nativeElement;

    if (!name?.value.trim()) {
      name?.classList.add('is-invalid');
      valid = false;
    }
    if (!email?.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
      email?.classList.add('is-invalid');
      valid = false;
    }
    if (!message?.value.trim()) {
      message?.classList.add('is-invalid');
      valid = false;
    }

    if (!valid) {
      event.preventDefault();
      return;
    }

    this.buildNextUrl();
  }

  private buildNextUrl(): void {
    const url = new URL(window.location.href);
    url.searchParams.set('success', '1');
    if (this.redirectHash) {
      url.hash = this.redirectHash;
    }
    this.nextUrl = url.toString();
  }
}

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ContactFormComponent } from '../../shared/contact-form/contact-form.component';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, FadeInDirective, ContactFormComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
})
export class ContactComponent {
  contactSubject = 'New inquiry — Wellyx website (Contact page)';
  contactHash = '';
}

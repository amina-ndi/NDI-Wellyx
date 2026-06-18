import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, FadeInDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {}

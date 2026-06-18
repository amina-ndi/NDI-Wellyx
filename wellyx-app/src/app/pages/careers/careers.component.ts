import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-careers',
  standalone: true,
  imports: [RouterLink, FadeInDirective],
  templateUrl: './careers.component.html',
  styleUrl: './careers.component.css',
})
export class CareersComponent {}

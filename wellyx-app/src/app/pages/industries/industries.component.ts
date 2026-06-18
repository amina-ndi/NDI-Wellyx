import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FadeInDirective } from '../../shared/directives/fade-in.directive';

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [RouterLink, FadeInDirective],
  templateUrl: './industries.component.html',
  styleUrl: './industries.component.css',
})
export class IndustriesComponent {}

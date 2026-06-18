import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NavbarService {
  readonly heroDark = signal(false);
}

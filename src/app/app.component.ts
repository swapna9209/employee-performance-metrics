import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main class="app">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .app { padding: 16px; font-family: $font-family; background: #f5f7fb; min-height: 100vh; }
  `]
})
export class AppComponent {}

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <main class="app">
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.scss']  })
export class AppComponent {
   title = 'my-app';
}

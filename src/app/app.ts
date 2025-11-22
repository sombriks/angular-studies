import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to {{ title() }}!</h1>

    <button (click)="counter.set(counter() + 1)">Count is {{counter()}}</button>
    
    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('hello-world');
  protected readonly counter = signal(0);
}

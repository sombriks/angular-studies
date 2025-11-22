import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to {{ title() }}!</h1>

    <button (click)="counter.set(counter() + 1)">Count is {{counter()}}</button>
    <button (click)="doubler = doubler * 2">Double is {{doubler}}</button>
    
    <router-outlet />
  `,
  styles: [`button { margin: 1rem; }`],
})
export class App {
  protected readonly title = signal('hello-world');
  protected readonly counter = signal(0);
  protected doubler = 2;
}

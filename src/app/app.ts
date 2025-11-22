import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from './counter/counter';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Counter],
  template: `
    <h1>Welcome to {{ title() }}!</h1>

    <app-counter/>
    <button (click)="doubler = doubler * 2">Double is {{doubler}}</button>
    
    <router-outlet />
  `,
  styles: [`button { margin: 1rem; }`],
})
export class App {

  protected readonly title = signal('hello-world')
  protected doubler = 2

  constructor() {
      console.log('init')
  }
}

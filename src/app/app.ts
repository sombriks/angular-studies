import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from './counter/counter';
import { Doubler } from "./components/doubler/doubler";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Counter, Doubler],
  template: `
    <h1>Welcome to {{ title() }}!</h1>
    <app-counter [counter]="counter()" (onCount)="counter.set($event)"></app-counter>
    <app-doubler [doubler]="counter()" (onDouble)="counter.set($event)"></app-doubler>
    <router-outlet />
  `,
  styles: [`button { margin: 1rem; }`],
})
export class App {

  protected readonly title = signal('hello-world')
  protected readonly counter = signal(7)

  constructor() {
      console.log('init')
  }
}

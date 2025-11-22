import { Component, model, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Counter } from './counter/counter';
import { Doubler } from "./components/doubler/doubler";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, Counter, Doubler],
  template: `
    <h1>Welcome to {{ title() }}!</h1>
    <p> Numbre is  <input type="number" [(ngModel)]="counter" /> </p>
    <app-counter [counter]="counter()" (onCount)="counter.set($event)"></app-counter>
    <app-doubler [doubler]="counter()" (onDouble)="counter.set($event)"></app-doubler>
    <router-outlet />
  `,
  styles: [`button { margin: 1rem; }`],
})
export class App {

  protected readonly title = signal('hello-world')
  protected readonly counter = model(7)

  constructor() {
      console.log('init')
  }
}

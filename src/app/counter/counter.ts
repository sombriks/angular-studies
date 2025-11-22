import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  template: `
    <p>
      counter works!
    </p>
    <button (click)="counter.set(counter() + 1)">Count is {{counter()}}</button>
  `,
  styles: ``,
})
export class Counter {
  protected readonly counter = signal(0)
}

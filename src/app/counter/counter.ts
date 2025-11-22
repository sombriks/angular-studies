import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  template: `
    <p>
      counter works!
    </p>
    <button (click)="onCount.emit(counter() + 1)">Count is {{counter()}}</button>
  `,
  styles: ``,
})
export class Counter {
  readonly counter = input(0)
  readonly onCount = output<number>();
}

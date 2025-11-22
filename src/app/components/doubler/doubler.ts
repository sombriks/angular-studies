import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-doubler',
  imports: [],
  templateUrl: './doubler.html',
  styleUrl: './doubler.scss',
})
export class Doubler {
  @Input() doubler = 2
  @Output() onDouble = new EventEmitter<number>();
}

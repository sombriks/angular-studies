import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks {

  readonly tasks : Task[] = [
    { id: 1, title: 'Task One', completed: false },
    { id: 2, title: 'Task Two', completed: true },
    { id: 3, title: 'Task Three', completed: false },
  ];

  selected : Task = {};

  selectTask(task: any) {
    this.selected = task;
  }
}

export type Task = { 
  id?: number;
  title?: string;
  completed?: boolean;
 };
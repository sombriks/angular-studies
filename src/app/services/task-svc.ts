import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // means this s a singleton
})
export class TaskSvc {
  
  private _tasks: Task[] = [
    { id: 1, title: 'Task One', completed: false },
    { id: 2, title: 'Task Two', completed: true },
    { id: 3, title: 'Task Three', completed: false },
  ];

  private _selected?: Task;

  get tasks(): Task[] {
    return this._tasks;
  }

  get selected(): Task | undefined {
    return this._selected;
  }

  set selected(task: Task | undefined) {
    this._selected = task;
  }
}

export type Task = { 
  id?: number;
  title?: string;
  completed?: boolean;
 };
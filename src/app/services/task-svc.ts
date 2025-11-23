import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // means this s a singleton
})
export class TaskSvc {
  
  getTasks() {
    return [
      { id: 1, title: 'Task One', completed: false },
      { id: 2, title: 'Task Two', completed: true },
      { id: 3, title: 'Task Three', completed: false },
    ];
  }
}

export type Task = { 
  id?: number;
  title?: string;
  completed?: boolean;
 };
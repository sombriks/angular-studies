import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TaskSvc, Task } from './services/task-svc';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <button routerLink="/people">People</button>
    <button routerLink="/tasks">Tasks</button>
    <p>There are {{ taskCount | async }} tasks.</p>
    <router-outlet />
  `,
  styles: [],
})
export class App {

  protected title = 'hello-world'
  private _taskCount?: Observable<number>;
  constructor(
    private taskSvc: TaskSvc
  ) {}  

  get taskCount() : Observable<number> {
     if(!this._taskCount)
      this._taskCount =  this.taskSvc.tasks.pipe(
        map((tasks: Task[]) => tasks.length)
      );
      return this._taskCount;
  }
}

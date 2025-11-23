import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { TaskSvc } from './services/task-svc';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <button routerLink="/people">People</button>
    <button routerLink="/tasks">Tasks</button>
    <p>There are {{ taskCount }} tasks.</p>
    <router-outlet />
  `,
  styles: [],
})
export class App {

  protected title = 'hello-world'

  constructor(
    private taskSvc: TaskSvc
  ) {}  

  get taskCount() : number {
    return this.taskSvc.tasks.length;
  }

}

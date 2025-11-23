# angular studies

sample project with quick steps on various common needs on frontend angular
projects

## Table of contents

- [Hello World](https://github.com/sombriks/angular-studies/tree/01-hello-world)
- [Basic Interactivity](https://github.com/sombriks/angular-studies/tree/02-click-counter)
- [Basic Components](https://github.com/sombriks/angular-studies/tree/03-components)
- [Navigation](https://github.com/sombriks/angular-studies/tree/04-router)
- Services and RxJS
- [Directives]
- _TBD_

Back to [main](https://github.com/sombriks/angular-studies)

## Requirements

- node 22

## Services

You need services whenever the data being processed and presented is needed on
other context. You create a service when the
[Locality of Behavior](https://htmx.org/essays/locality-of-behaviour/) no longer
applies.

A service is another layer in your application architecture.

For example, let's change the following component to get the data from a service
instead of local state:

```typescript
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
```

First create a service to manage the tasks:

```bash
npx ng g s services/task-svc
```

The resulting service then can be modified like this:

```typescript
// src/app/services/task-svc.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // means this is a singleton
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
```

Then modify te component to rely on the service:

```typescript
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskSvc, Task } from '../../services/task-svc';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks {

  constructor(
    private taskSvc: TaskSvc
  ) {}  

  ngOnInit() {
    this.tasks = this.taskSvc.getTasks();
  }

  protected tasks : Task[] = [];

  protected selected : Task = {};

  selectTask(task: any) {
    this.selected = task;
  }
}
```

## Shared state

Now that the state is centralized, non-related components can present the same
data in distinct ways. For example, we can show the task count on main app page,
outside the `router-outlet`:

```typescript
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
```

Ando now, if you change the task list, it will reflect not only locally, but
also in any other context using the same shared service:

```typescript
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';    
import { FormsModule } from '@angular/forms';
import { TaskSvc, Task } from '../../services/task-svc';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks {

  protected newTaskTitle: string = '';

  constructor(
    private taskSvc: TaskSvc
  ) {}  

  protected get tasks() : Task[] {
    return this.taskSvc.tasks;
  }

  protected get selected() : Task | undefined {
    return this.taskSvc.selected;
  }

  protected set selected(task: Task | undefined) {
    this.taskSvc.selected = task;
  }

  protected createTask() {
    const newTask: Task = {  id: new Date().getTime(), title: this.newTaskTitle, completed: false };
    this.taskSvc.tasks.push(newTask);
    this.selected = newTask;
    this.newTaskTitle = '';
  }
}
```

## External state sources

Things get more interesting when you start to consume remote services.
Besides handle central state, you also need to handle the async nature of remote
data.

This is where [rxjs](https://rxjs.dev/) comes to help.

Change the service to perform http requests and expose the results as
`Observable`:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root', // means this s a singleton
})
export class TaskSvc {
  
  private readonly API_URL = 'http://localhost:3000/api/';
  
  private _selected?: Task; 
  private _tasks$ = new BehaviorSubject<Task[]>([]);
  private tasks$ = this._tasks$.asObservable();

  constructor(private http: HttpClient) {
    this.refresh();
  }  
  
  private refresh() {
    this.http.get<Task[]>(`${this.API_URL}tasks`)
      .subscribe(tasks => this._tasks$.next(tasks));
  }

  get tasks(): Observable<Task[]> {
    return this.tasks$;
  }

  get selected(): Task | undefined {
    return this._selected;
  }

  set selected(task: Task | undefined) {
    this._selected = task;
  }

  createTask(title: string): Task {
    const newTask: Task = { title,  id: new Date().getTime(), completed: false };
    this.http
      .post<Task>(`${this.API_URL}tasks`, newTask)
      .pipe(tap(() => this.refresh()))
      .subscribe();
    return newTask;
  }
}

export type Task = { 
  id?: number;
  title?: string;
  completed?: boolean;
 };
```

## How to build

You can start the [development server](http://localhost:4200) with this
npm script:

```bash
npm start
```

## Noteworthy

- Before signals, services depended on rxjs to keep state properly updated
  across all application.

## Further reading

- <https://angular.dev/tutorials/learn-angular>
- <https://v16.angular.io/start>
- <https://www.youtube.com/watch?v=2LCo926NFLI>

# angular studies

sample project with quick steps on various common needs on frontend angular
projects

## Table of contents

- [Hello World](https://github.com/sombriks/angular-studies/tree/01-hello-world)
- [Basic Interactivity](https://github.com/sombriks/angular-studies/tree/02-click-counter)
- [Basic Components](https://github.com/sombriks/angular-studies/tree/03-components)
- [Navigation](https://github.com/sombriks/angular-studies/tree/04-router)
- Services
- [Directives]
- [RxJS]
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

## Shared state

## External sources

## How to build

Uou can start the [development server](http://localhost:4200) with this
npm script:

```bash
npm start
```

## Noteworthy

-

## Further reading

- <https://angular.dev/tutorials/learn-angular>
- <https://v16.angular.io/start>
- <https://www.youtube.com/watch?v=2LCo926NFLI>

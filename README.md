# angular studies

sample project with quick steps on various common needs on frontend angular
projects

## Table of contents

- Hello World
- [Basic Interactivity]
- [Basic Components]
- [Navigation]
- [The Angular CLI]
- [Directives]
- [Services]
- [RxJS]
- _TBD_

Back to [main](https://github.com/sombriks/angular-studies)

## Requirements

- node 22

## The click counter

To make a counter all you need is a [signal](https://angular.dev/guide/signals)
and an event to update it:

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to {{ title() }}!</h1>

    <button (click)="counter.set(counter() + 1)">Count is {{counter()}}</button>
    
    <router-outlet />
  `,
  styles: [],
})
export class App {
  protected readonly title = signal('hello-world');
  protected readonly counter = signal(0);
}
```

## How to build

Uou can start the [development server](http://localhost:4200) with this
npm script:

```bash
npm start
```

## Noteworthy

- Ideally provide an empty directory for new angular projects.
- The command used to create the project was intended to avoid all interactive
  prompts, bu you still might get one from angular cli itself.
- Even being a minimal project, this is actually an
  [angular workspace](https://angular.dev/reference/configs/workspace-config).
- Project also comes prepared to use
  [routes](https://angular.dev/api/router/Route#simple-configuration) for
  navigation.

## Further reading

- <https://angular.dev/tutorials/learn-angular>
- <https://v16.angular.io/start>
- <https://www.youtube.com/watch?v=2LCo926NFLI>

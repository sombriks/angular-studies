# angular studies

sample project with quick steps on various common needs on frontend angular
projects

## Table of contents

- [Hello World](https://github.com/sombriks/angular-studies/tree/01-hello-world)
- Basic Interactivity
- [Basic Components](https://github.com/sombriks/angular-studies/tree/03-components)
- [Navigation](https://github.com/sombriks/angular-studies/tree/04-router)
- [Services](https://github.com/sombriks/angular-studies/tree/05-services)
- [Directives]
- [RxJS]
- _TBD_

Back to [main](https://github.com/sombriks/angular-studies)

## Requirements

- node 22

## The click counter

To make a counter, all you need is a [signal](https://angular.dev/guide/signals)
and fire a simple event to update it:

```typescript
// src/app/app.ts
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
  styles: [`button { margin: 1rem; }`],
})
export class App {
  protected readonly title = signal('hello-world');
  protected readonly counter = signal(0);
}
```

Older angular versions simply relied on direct use of class properties:

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to {{ title() }}!</h1>

    <button (click)="counter.set(counter() + 1)">Count is {{counter()}}</button>
    <button (click)="doubler = doubler * 2">Double is {{doubler}}</button>
    
    <router-outlet />
  `,
  styles: [`button { margin: 1rem; }`],
})
export class App {
  protected readonly title = signal('hello-world');
  protected readonly counter = signal(0);
  protected doubler = 2;
}
```

On such simple example there is no real difference between using a signal or a
property directly. But the differences will appear on next examples.

## How to build

You can start the [development server](http://localhost:4200) with this
npm script:

```bash
npm start
```

## Noteworthy

- Any sort of attribute and method can be used in template, as long as it gets
  properly declared and minimally accessible (i.e. you can't use private props
  or methods on the template).

## Further reading

- <https://angular.dev/tutorials/learn-angular>
- <https://v16.angular.io/start>
- <https://www.youtube.com/watch?v=2LCo926NFLI>

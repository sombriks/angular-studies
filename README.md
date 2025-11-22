# angular studies

sample project with quick steps on various common needs on frontend angular
projects

## Table of contents

- [Hello World](https://github.com/sombriks/angular-studies/tree/01-hello-world)
- [Basic Interactivity](https://github.com/sombriks/angular-studies/tree/02-click-counter)
- Basic Components
- [Navigation]
- [The Angular CLI]
- [Directives]
- [Services]
- [RxJS]
- _TBD_

Back to [main](https://github.com/sombriks/angular-studies)

## Requirements

- node 22

## Creating and using components

To generate a new component, use the angular cli:

```bash
npx ng generate component counter
```

```typescript
// src/app/counter/counter.ts
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  template: `
    <p>
      counter works!
    </p>
    <button (click)="counter.set(counter() + 1)">Count is {{counter()}}</button>
  `,
  styles: ``,
})
export class Counter {
  protected readonly counter = signal(0)
}
```

The component will appear on `src/app/counter`

### Import and use components

To use a component on another, first import the script and then add the declared
class  into the `import` array:

```typescript
// src/app/app.ts
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from './counter/counter';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Counter],
  template: `
    <h1>Welcome to {{ title() }}!</h1>

    <app-counter/>
    <button (click)="doubler = doubler * 2">Double is {{doubler}}</button>
    
    <router-outlet />
  `,
  styles: [`button { margin: 1rem; }`],
})
export class App {

  protected readonly title = signal('hello-world')
  protected doubler = 2

  constructor() {
      console.log('init')
  }
}
```

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

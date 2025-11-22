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

### Application state goes down, change events bubbles up

The nice part of components is the reuse possibility in slightly different
contexts.

Usually the difference is the current data, best known as **application state**.

To make the child component able to receive the state from parent, use the
special `input` signal variant:

```typescript
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  template: `
    <p>
      counter works!
    </p>
    <button (click)="onCount.emit(counter() + 1)">Count is {{counter()}}</button>
  `,
  styles: ``,
})
export class Counter {
  readonly counter = input(0)
  readonly onCount = output<number>();
}
```

Values receive can be manipulated in various ways on child components, but they
can not be changed there. I's possible to create derivative values, copy state
to a local one, but no changing.

In order to propagate any desired modification, it needs to go as an event, as
seen in the click event firing an `emit` from an `output`.

The parent can then handle with the child component this way:

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from './counter/counter';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Counter],
  template: `
    <h1>Welcome to {{ title() }}!</h1>

    <app-counter [counter]="counter()" (onCount)="counter.set($event)"></app-counter>
    <button (click)="doubler = doubler * 2">Double is {{doubler}}</button>
    
    <router-outlet />
  `,
  styles: [`button { margin: 1rem; }`],
})
export class App {

  protected readonly title = signal('hello-world')
  protected readonly counter = signal(7)
  protected doubler = 2

  constructor() {
      console.log('init')
  }
}
```

Before signals, message passing used to be done by special annotated fields.

Let's create the doubler:

```bash
npx ng generate component components/doubler \
  --inline-template=false \
  --inline-style=false
```

You can override the project defaults for template and style.

Instead of signals, You can use `Input`, `Output` and `EventEmitter`:

```typescript
// src/app/components/double/doubler.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-doubler',
  imports: [],
  templateUrl: './doubler.html',
  styleUrl: './doubler.scss',
})
export class Doubler {
  @Input() doubler = 2
  @Output() onDouble = new EventEmitter<number>();
}
```

The template is also straightforward:

```html
<p>doubler works!</p>
<button (click)="onDouble.emit(doubler = doubler * 2)">Double is {{doubler}}</button>
```

For the parent, there is no difference on how to interact with children with
this style of property/event idiom:

```typescript
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Counter } from './counter/counter';
import { Doubler } from "./components/doubler/doubler";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Counter, Doubler],
  template: `
    <h1>Welcome to {{ title() }}!</h1>
    <app-counter [counter]="counter()" (onCount)="counter.set($event)"></app-counter>
    <app-doubler [doubler]="counter()" (onDouble)="counter.set($event)"></app-doubler>
    <router-outlet />
  `,
  styles: [`button { margin: 1rem; }`],
})
export class App {

  protected readonly title = signal('hello-world')
  protected readonly counter = signal(7)

  constructor() {
      console.log('init')
  }
}
```

### Two-way data binding

Angular also offers a simple way to handle the bi-directional data flow.
Useful when the value being handled is simple:

```typescript
import { Component, model, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Counter } from './counter/counter';
import { Doubler } from "./components/doubler/doubler";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, Counter, Doubler],
  template: `
    <h1>Welcome to {{ title() }}!</h1>
    <p> Numbre is  <input type="number" [(ngModel)]="counter" /> </p>
    <app-counter [counter]="counter()" (onCount)="counter.set($event)"></app-counter>
    <app-doubler [doubler]="counter()" (onDouble)="counter.set($event)"></app-doubler>
    <router-outlet />
  `,
  styles: [`button { margin: 1rem; }`],
})
export class App {

  protected readonly title = signal('hello-world')
  protected readonly counter = model(7)

  constructor() {
      console.log('init')
  }
}

```

### Which one is better, signals or annotated properties?

Annotated properties are the classic way to do these things in angular. Signals
are the new, reactive api.

Go with signals  whenever possible.

## How to build

Uou can start the [development server](http://localhost:4200) with this
npm script:

```bash
npm start
```

## Noteworthy

- Prefer use `npx ng` instead of global `ng` command. Once created the project,
  use the one already present in the project helps to avoid versions mismatches.

## Further reading

- <https://angular.dev/tutorials/learn-angular>
- <https://v16.angular.io/start>
- <https://www.youtube.com/watch?v=2LCo926NFLI>

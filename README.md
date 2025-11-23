# angular studies

sample project with quick steps on various common needs on frontend angular
projects

## Table of contents

- [Hello World](https://github.com/sombriks/angular-studies/tree/01-hello-world)
- [Basic Interactivity](https://github.com/sombriks/angular-studies/tree/02-click-counter)
- [Basic Components](https://github.com/sombriks/angular-studies/tree/03-components)
- Navigation
- [The Angular CLI]
- [Directives]
- [Services]
- [RxJS]
- _TBD_

Back to [main](https://github.com/sombriks/angular-studies)

## Requirements

- node 22

## Application routes

Routers are a core part of any
[SPA](https://developer.mozilla.org/en-US/docs/Glossary/SPA) and angular
supports it since the old [angularjs](https://angularjs.org/) days.

Let's add two pages:

```bash
 npx ng g c pages/people
 npx ng g c pages/tasks
```

Then add the pages in the `app.routes.ts`:

```typescript
// src/app/app.routes.ts
import {Routes} from '@angular/router';
import {People} from './pages/people/people'
import {Tasks} from "./pages/tasks/tasks";

export const routes: Routes = [
  {path: '', redirectTo: '/people', pathMatch: 'full'},
  {path: 'people', component: People},
  {path: 'tasks', component: Tasks},
];

```

Proper router configuration is already done in `app.config.ts`.

Next, just add some links in app.ts so you can navigate through pages:

```typescript
import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  template: `
    <h1>Welcome to {{ title }}!</h1>
    <button routerLink="/people">People</button>
    <button routerLink="/tasks">Tasks</button>
    <router-outlet />
  `,
  styles: [],
})
export class App {

  protected title = 'hello-world'

}
```



## How to build

Uou can start the [development server](http://localhost:4200) with this
npm script:

```bash
npm start
```

## Noteworthy

- The angular cli does not offer any special generator for router, it'd up to
  you to properly import and use components in your router configuration.

## Further reading

- <https://angular.dev/tutorials/learn-angular>
- <https://v16.angular.io/start>
- <https://www.youtube.com/watch?v=2LCo926NFLI>

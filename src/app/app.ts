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

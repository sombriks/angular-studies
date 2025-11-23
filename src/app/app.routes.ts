import {Routes} from '@angular/router';
import {People} from './pages/people/people'
import {Tasks} from "./pages/tasks/tasks";

export const routes: Routes = [
    {path: '', redirectTo: '/people', pathMatch: 'full'},
    {path: 'people', component: People},
    {path: 'tasks', component: Tasks},
];

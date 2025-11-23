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
    this.http.post<Task>(`${this.API_URL}tasks`, newTask)
    .pipe(tap(() => this.refresh())).subscribe();
    return newTask;
  }
}

export type Task = { 
  id?: number;
  title?: string;
  completed?: boolean;
 };
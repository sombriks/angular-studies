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
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskSvc, Task } from '../../services/task-svc';

@Component({
  selector: 'app-tasks',
  imports: [CommonModule],
  templateUrl: './tasks.html',
  styleUrl: './tasks.scss',
})
export class Tasks {

  constructor(
    private taskSvc: TaskSvc
  ) {}  

  ngOnInit() {
    this.tasks = this.taskSvc.getTasks();
  }

  protected tasks : Task[] = [];

  protected selected : Task = {};

  selectTask(task: any) {
    this.selected = task;
  }
}
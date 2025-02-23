import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})

export class TaskFormComponent {

  title = '';
  description = '';

  @Output() taskAdded = new EventEmitter<Task>();

  constructor(private taskService: TaskService) {}

  addTask() {
    if (this.title && this.description) {
      this.taskService.createTask({ title: this.title, description: this.description }).subscribe((newTask) => {
        this.taskAdded.emit(newTask);
        this.title = '';
        this.description = '';
      });
    }
  }
}

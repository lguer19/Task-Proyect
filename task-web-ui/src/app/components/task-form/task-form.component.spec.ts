import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskFormComponent } from './task-form.component';
import { TaskService, Task } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Component } from '@angular/core';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['createTask']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, TaskFormComponent],
      providers: [{ provide: TaskService, useValue: mockTaskService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should emit a task when addTask() is called', () => {
    const testTask: Task = { title: 'Nueva Tarea', description: 'Descripción de prueba' };
    mockTaskService.createTask.and.returnValue(of(testTask));

    spyOn(component.taskAdded, 'emit');

    component.title = testTask.title;
    component.description = testTask.description;
    component.addTask();

    expect(mockTaskService.createTask).toHaveBeenCalledWith(testTask);
    expect(component.taskAdded.emit).toHaveBeenCalledWith(testTask);
    expect(component.title).toBe('');
    expect(component.description).toBe('');
  });

  it('should not call the service if the fields are empty', () => {
    component.title = '';
    component.description = '';
    
    component.addTask();

    expect(mockTaskService.createTask).not.toHaveBeenCalled();
  });
});

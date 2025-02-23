import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskListComponent } from './task-list.component';
import { TaskService, Task } from '../../services/task.service';
import { of } from 'rxjs';
import { TaskFormComponent } from '../task-form/task-form.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let mockTaskService: jasmine.SpyObj<TaskService>;

  beforeEach(async () => {
    mockTaskService = jasmine.createSpyObj('TaskService', ['getTask', 'createTask', 'deleteTask']);

    await TestBed.configureTestingModule({
      imports: [TaskListComponent, TaskFormComponent],
      providers: [{ provide: TaskService, useValue: mockTaskService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on initialization', () => {
    const tasksMock: Task[] = [{ id: 1, title: 'Tarea 1', description: 'Descripción 1' }];
    mockTaskService.getTask.and.returnValue(of(tasksMock));

    component.ngOnInit();
    expect(component.tasks.length).toBe(1);
    expect(component.tasks).toEqual(tasksMock);
  });

  it('should add a new task', () => {
    const newTask: Task = { id: 2, title: 'Nueva tarea', description: 'Nueva descripción' };
    mockTaskService.createTask.and.returnValue(of(newTask));

    component.refreshTasks(newTask);

    expect(mockTaskService.createTask).toHaveBeenCalledWith(newTask);
    expect(component.tasks.length).toBe(1);
    expect(component.tasks[0]).toEqual(newTask);
  });
});

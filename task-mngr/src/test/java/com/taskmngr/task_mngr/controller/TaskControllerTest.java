package com.taskmngr.task_mngr.controller;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;
import java.util.Arrays;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import com.taskmngr.task_mngr.model.Task;
import com.taskmngr.task_mngr.service.TaskService;

class TaskControllerTest {
    @Mock
    private TaskService taskService;

    @InjectMocks
    private TaskController taskController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllTasks() {
        Task task1 = new Task();
        task1.setId(1L);
        task1.setTitle("Task 1");
        task1.setDescription("Description 1");

        Task task2 = new Task();
        task2.setId(2L);
        task2.setTitle("Task 2");
        task2.setDescription("Description 2");

        when(taskService.getAllTasks()).thenReturn(Arrays.asList(task1, task2));

        List<Task> tasks = taskController.getAllTasks();
        assertEquals(2, tasks.size());
    }

    @Test
    void testCreateTask() {
        Task task = new Task();
        task.setTitle("New Task");
        task.setDescription("New Task Description");

        when(taskService.createTask(any(Task.class))).thenReturn(task);

        Task createdTask = taskController.createTask(task);
        assertEquals("New Task", createdTask.getTitle());
    }

    @Test
    void testDeleteTask() {
        Long taskId = 1L;
        doNothing().when(taskService).deleteTask(taskId);

        assertDoesNotThrow(() -> taskController.deleteTask(taskId));
        verify(taskService, times(1)).deleteTask(taskId);
    }
}

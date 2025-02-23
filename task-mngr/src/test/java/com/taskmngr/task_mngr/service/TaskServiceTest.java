package com.taskmngr.task_mngr.service;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import com.taskmngr.task_mngr.model.Task;

import java.util.List;

class TaskServiceTest {
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        taskService = new TaskService();
    }

    @Test
    void testCreateTask() {
        Task task = new Task();
        task.setTitle("Test Task");
        task.setDescription("This is a test task");

        Task createdTask = taskService.createTask(task);

        assertNotNull(createdTask.getId());
        assertEquals("Test Task", createdTask.getTitle());
        assertEquals("This is a test task", createdTask.getDescription());
    }

    @Test
    void testGetAllTasks() {
        Task task1 = new Task();
        task1.setTitle("Task 1");
        task1.setDescription("Description 1");
        taskService.createTask(task1);

        Task task2 = new Task();
        task2.setTitle("Task 2");
        task2.setDescription("Description 2");
        taskService.createTask(task2);

        List<Task> tasks = taskService.getAllTasks();
        assertEquals(2, tasks.size());
    }

    @Test
    void testDeleteTask() {
        Task task = new Task();
        task.setTitle("Task to delete");
        task.setDescription("This task will be deleted");

        Task createdTask = taskService.createTask(task);
        Long taskId = createdTask.getId();

        taskService.deleteTask(taskId);
        assertTrue(taskService.getAllTasks().isEmpty());
    }
}

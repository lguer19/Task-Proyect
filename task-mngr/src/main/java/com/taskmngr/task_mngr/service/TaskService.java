package com.taskmngr.task_mngr.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import com.taskmngr.task_mngr.model.Task;

@Service
public class TaskService {
    private final List<Task> tasks = new ArrayList<>();
    private Long nextId = 1L;

    public List<Task> getAllTasks() {
        return tasks;
    }

    public Task createTask(Task task) {
        task.setId(nextId++);
        tasks.add(task);
        return task;    
    }

    public void deleteTask(Long id) {
        tasks.removeIf(task -> task.getId().equals(id));
    }
}

package com.taskmngr.task_mngr.model;

import lombok.Data;

@Data
public class Task {
    private Long id;
    private String title;
    private String description;
}

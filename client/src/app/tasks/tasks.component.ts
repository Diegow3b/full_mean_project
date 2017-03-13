import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../../../task';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

    tasks: Task[];
    title: string;

    constructor(private taskService: TaskService) {
        this.taskService.getTasks()
            .subscribe(tasks => {
                this.tasks = tasks;
            });
    }

    addTask(event) {
        event.preventDefault();
        var newTask = {
            title: this.title,
            isDone: false
        }

        this.taskService.addTask(newTask)
        .subscribe(task => {
            this.tasks.push(task);
            this.title = '';
        });

    }

    ngOnInit() {
    }

}

import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { ITask } from "../../models/ITask.model";

@Component({
  selector: "app-tasks-page",
  templateUrl: "./tasks-page.component.html",
  styleUrls: ["./tasks-page.component.scss"],
})
export class TasksPageComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  tasks: ITask[] = [];

  ngOnInit(): void {
    this.taskService.getTasksList().subscribe((response) => {
      this.tasks = response.data.tasks;
    });
  }
}

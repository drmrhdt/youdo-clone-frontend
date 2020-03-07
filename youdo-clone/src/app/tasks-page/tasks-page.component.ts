import { Component, OnInit } from "@angular/core";
import { TaskService } from "../task.service";
import { TaskPreview } from "../../models/TaskPreview.model";

@Component({
  selector: "app-tasks-page",
  templateUrl: "./tasks-page.component.html",
  styleUrls: ["./tasks-page.component.scss"]
})
export class TasksPageComponent implements OnInit {
  constructor(private taskService: TaskService) {}

  tasksPreviews: TaskPreview[] = [];

  ngOnInit(): void {
    this.taskService.getTasksPreviewList().subscribe(response => {
      this.tasksPreviews = response.tasksPreview;
    });
  }
}

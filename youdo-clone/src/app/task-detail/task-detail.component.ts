import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { ActivatedRoute } from "@angular/router";
import { TaskPreview } from "../../models/TaskPreview.model";

@Component({
  selector: "app-task-detail",
  templateUrl: "./task-detail.component.html",
  styleUrls: ["./task-detail.component.scss"]
})
export class TaskDetailComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  isLoading: boolean;
  task: TaskPreview;

  ngOnInit(): void {
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get("taskId");
    this.taskService.getTaskById(id).subscribe(response => {
      this.isLoading = false;
      return (this.task = response.data.task);
    });
  }
}

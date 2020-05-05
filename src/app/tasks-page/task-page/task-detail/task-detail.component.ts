import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../../../services/task.service";
import { ActivatedRoute } from "@angular/router";
import { ITask } from "../../../../models/ITask.model";

@Component({
  selector: "app-task-detail",
  templateUrl: "./task-detail.component.html",
  styleUrls: ["./task-detail.component.scss"],
})
export class TaskDetailComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ) {}

  isLoading: boolean;
  task: ITask;

  ngOnInit(): void {
    this.isLoading = true;
    const _id = this.route.snapshot.paramMap.get("taskId");
    this.taskService.getTaskById(_id).subscribe((response) => {
      this.isLoading = false;
      return (this.task = response.data.task);
    });
  }
}

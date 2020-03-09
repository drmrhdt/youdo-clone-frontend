import { Component, OnInit } from "@angular/core";
import { TaskService } from "../../services/task.service";
import { ActivatedRoute } from "@angular/router";

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

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get("taskId");
    this.taskService.getTaskById(id).subscribe(task => console.log(task));
  }
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TaskService } from "../../services/task.service";
import { UserService } from "src/services/user.service";
import { ITask } from "../../models/ITask.model";
import { ITasksResponse } from "src/models/ITasksResponse";
import { IUser } from "src/models/IUser.model";

@Component({
  selector: "app-tasks-page",
  templateUrl: "./tasks-page.component.html",
  styleUrls: ["./tasks-page.component.scss"],
})
export class TasksPageComponent implements OnInit {
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  tasks: ITask[] = [];
  signedInUserId: string;

  ngOnInit(): void {
    this.userService.currentUserListener$.subscribe((response: IUser) => {
      if (response) this.signedInUserId = response._id;
    });

    if (this.route.snapshot.url[2].path === "my") {
      this.taskService
        .getTasksListByFilter("authorId", this.signedInUserId)
        .subscribe((response: ITasksResponse) => {
          this.tasks = response.data.tasks;
        });
    } else {
      this.taskService.getTasksList().subscribe((response: ITasksResponse) => {
        this.tasks = response.data.tasks;
      });
    }
  }
}

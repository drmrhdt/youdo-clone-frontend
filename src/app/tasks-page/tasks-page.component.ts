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
  isLoading: boolean = true;
  tasks: ITask[] = [];
  signedInUserId: string;
  title: string = this.isMyTasks ? "Мои заказы" : "Все категории";

  get isMyTasks() {
    return this.route.snapshot.url[2].path === "my";
  }

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.currentUserListener$.subscribe((response: IUser) => {
      if (response) this.signedInUserId = response._id;
      if (this.isMyTasks) {
        this.taskService
          .getTasksListByFilter("authorId", this.signedInUserId)
          .subscribe((response: ITasksResponse) => {
            this.tasks = response.data.tasks;
            this.isLoading = false;
          });
      } else {
        this.taskService
          .getTasksList()
          .subscribe((response: ITasksResponse) => {
            this.tasks = response.data.tasks;
            this.isLoading = false;
          });
      }
    });
  }
}

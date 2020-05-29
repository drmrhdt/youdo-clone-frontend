import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
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
  // title: string;

  get isMyTasks() {
    return this.route.snapshot.url[2].path === "my";
  }

  private _unsubscriber$ = new Subject();

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
    private userService: UserService
  ) {
    // TODO set title for isMyTasks
    // if (this.isMyTasks) {
    //   this.title = "Мои заказы";
    // }
  }

  ngOnInit(): void {
    this.userService.currentUserListener$.subscribe((response: IUser) => {
      if (response) this.signedInUserId = response._id;
      if (this.isMyTasks) {
        this.taskService
          .getTasksListByFilter("authorId", this.signedInUserId)
          .pipe(takeUntil(this._unsubscriber$))
          .subscribe((response: ITasksResponse) => {
            this.tasks = response.data.tasks;
            this.isLoading = false;
          });
      } else {
        this.taskService
          .getTasksList()
          .pipe(takeUntil(this._unsubscriber$))
          .subscribe((response: ITasksResponse) => {
            this.tasks = response.data.tasks;
            this.isLoading = false;
          });
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscriber$.next(true);
    this._unsubscriber$.complete();
  }
}

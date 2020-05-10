import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TaskService } from "../../../../services/task.service";
import { UserService } from "src/services/user.service";
import { ITask } from "../../../../models/ITask.model";
import { ITaskResponse } from "src/models/ITaskResponse.model";
import { IUser } from "src/models/IUser.model";

@Component({
  selector: "app-task-detail",
  templateUrl: "./task-detail.component.html",
  styleUrls: ["./task-detail.component.scss"],
})
export class TaskDetailComponent implements OnInit {
  isLoading: boolean = true;
  task: ITask;
  signedInUserId: string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const _id = this.route.snapshot.paramMap.get("taskId");

    // TODO execute services sequantually
    // concat(
    //   this.taskService.getTaskById(_id),
    //   this.userService.currentUserListener$
    // ).subscribe((response) => {
    //   console.log(response);
    //   this.task = response.data.task;
    //   console.log(response._id);
    //   this.signedInUserId = response._id;
    //   // console.log(this.task);
    //   // console.log(this.signedInUserId);
    //   this.isLoading = false;
    // });

    // this.taskService.getTaskById(_id).pipe(flatMap(()=>this.userService.currentUserListener$))

    this.taskService.getTaskById(_id).subscribe((response: ITaskResponse) => {
      this.isLoading = false;
      this.task = response.data.task;
    });

    this.userService.currentUserListener$.subscribe((response: IUser) => {
      this.signedInUserId = response._id;
    });
  }

  onSubmit(): void {
    // TODO it works only after we go to another route and return here
    if (this.signedInUserId) {
      console.log("ok, but are you executor?");
    } else {
      console.log("no, you must sign in");
    }
  }
}

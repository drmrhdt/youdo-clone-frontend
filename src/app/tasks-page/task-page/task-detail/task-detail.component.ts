import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TaskService } from "../../../../services/task.service";
import { UserService } from "src/services/user.service";
import { ITask } from "../../../../models/ITask.model";
import { ITaskResponse } from "src/models/ITaskResponse.model";
import { IUser } from "src/models/IUser.model";
import { FormBuilder, Validators } from "@angular/forms";
import {
  SuggestionService,
  ISuggestionResponse,
} from "src/services/suggestion.service";
import { IPossibleExecutorSuggestion } from "src/models/IPossibleExecutorSuggestion.model";

@Component({
  selector: "app-task-detail",
  templateUrl: "./task-detail.component.html",
  styleUrls: ["./task-detail.component.scss"],
})
export class TaskDetailComponent implements OnInit {
  isLoading: boolean = true;
  isShowDialog: boolean = false;
  task: ITask;
  signedInUserId: string;
  signedInUser: IUser;
  suggestion: IPossibleExecutorSuggestion;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private userService: UserService,
    private suggestionService: SuggestionService
  ) {}

  form = this.formBuilder.group({
    paymentType: ["cash", Validators.required],
    price: [200, [Validators.required, Validators.min(200)]],
    commentary: "",
  });

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
      this.task = response.data.task;

      this.userService.currentUserListener$.subscribe((response: IUser) => {
        this.signedInUserId = response._id;
        this.signedInUser = response;

        this.suggestionService
          .getSuggestionByTaskIdAndExecutorId(
            this.task._id,
            this.signedInUserId
          )
          .subscribe((response: ISuggestionResponse) => {
            this.suggestion = response.data.suggestion;
            this.isLoading = false;
          });
      });
    });
  }

  showDialog(): void {
    this.isShowDialog = true;
    // TODO it works only after we go to another route and return here
  }

  onSubmit() {
    if (
      !this.form.invalid &&
      this.signedInUserId &&
      this.signedInUser.workInfo.isExecutor
    ) {
      this.suggestionService
        .addNewSuggestion({
          taskId: this.task._id,
          executorId: this.signedInUserId,
          ...this.form.value,
        })
        .subscribe(console.log);
    } else {
      console.log("no, you must sign in");
    }
  }
}

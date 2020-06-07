import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil, flatMap } from "rxjs/operators";
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { TaskService } from "../../../../services/task.service";
import { UserService } from "src/services/user.service";
import { ITask } from "../../../../models/ITask.model";
import { ITaskResponse } from "src/models/ITaskResponse.model";
import { IUser } from "src/models/IUser.model";
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
export class TaskDetailComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  isShowDialog: boolean = false;
  task: ITask;
  signedInUser: IUser;
  suggestion: IPossibleExecutorSuggestion;
  form: FormGroup;

  private _unsubscriber$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private userService: UserService,
    private suggestionService: SuggestionService
  ) {
    this.form = this.formBuilder.group({
      paymentType: ["cash", Validators.required],
      price: [200, [Validators.required, Validators.min(200)]],
      commentary: "",
    });
  }

  ngOnInit(): void {
    const _id = this.route.snapshot.params.taskId;

    this.taskService
      .getTaskById(_id)
      .pipe(
        takeUntil(this._unsubscriber$),
        flatMap((response: ITaskResponse) => {
          this.task = response.data.task;
          return this.userService.currentUserListener$;
        }),
        flatMap((response: IUser) => {
          this.signedInUser = response;
          return this.suggestionService.getSuggestionByTaskIdAndExecutorId(
            this.task._id,
            this.signedInUser._id
          );
        })
      )
      .subscribe((response: ISuggestionResponse) => {
        this.suggestion = response.data.suggestion;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this._unsubscriber$.next(true);
    this._unsubscriber$.complete();
  }

  showDialog(): void {
    this.isShowDialog = true;
    // TODO it works only after we go to another route and return here
  }

  onSubmit(): void {
    if (
      this.form.valid &&
      this.signedInUser &&
      this.signedInUser.workInfo.isExecutor
    ) {
      this.suggestionService
        .addNewSuggestion({
          taskId: this.task._id,
          executorId: this.signedInUser._id,
          ...this.form.value,
        })
        .pipe(takeUntil(this._unsubscriber$))
        .subscribe(console.log);
    } else {
      console.log("no, you must sign in");
    }
  }
}

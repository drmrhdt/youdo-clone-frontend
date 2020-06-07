import { Component, Input } from "@angular/core"

import { takeUntil } from "rxjs/operators"
import { FormBuilder, Validators, FormGroup } from "@angular/forms"

import { ITask } from "../../../../models/ITask.model"
import { IUser } from "src/models/IUser.model"
import { SuggestionService } from "src/services/suggestion.service"
import { Subject } from "rxjs"
import { IPossibleExecutorSuggestion } from "../../../../models/IPossibleExecutorSuggestion.model"
import { ActivatedRoute } from "@angular/router"

@Component({
  selector: "app-task-detail",
  templateUrl: "./task-detail.component.html",
  styleUrls: ["./task-detail.component.scss"],
})
export class TaskDetailComponent {
  @Input() isLoading: boolean = true
  @Input() task: ITask
  @Input() signedInUser: IUser
  @Input() suggestion: IPossibleExecutorSuggestion

  isShowDialog: boolean = false
  form: FormGroup

  private _unsubscriber$ = new Subject()

  get isMyTask(): boolean {
    return this.task?.authorId === this.signedInUser?._id
  }

  constructor(
    private suggestionService: SuggestionService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.form = this.formBuilder.group({
      paymentType: ["cash", Validators.required],
      price: [200, [Validators.required, Validators.min(200)]],
      commentary: "",
    })
  }

  showDialog(): void {
    this.isShowDialog = true
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
        .subscribe(console.log)
    } else {
      console.log("no, you must sign in")
    }
  }
}

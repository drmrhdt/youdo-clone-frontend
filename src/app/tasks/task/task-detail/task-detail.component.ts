import { Component, Input } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { SuggestionService } from 'src/services'

import { IUser, ITask } from 'src/models'

@Component({
    selector: 'app-task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
    @Input() isLoading: boolean = true
    @Input() task: ITask
    @Input() signedInUser: IUser

    isShowDialog: boolean = false
    form: FormGroup

    private _unsubscriber$ = new Subject()

    get isMyTask(): boolean {
        return this.task?.authorId._id === this.signedInUser?._id
    }
    get isSuggestedByCurrentUser(): boolean {
        return (
            this.task?.suggestions.findIndex(
                suggestion =>
                    suggestion.executorId._id === this.signedInUser._id
            ) !== -1
        )
    }
    // I'm sorry. I've tried.
    get isShowSuggestBtn(): boolean {
        if (this.isMyTask) return false
        if (!this.isMyTask) {
            if (this.isSuggestedByCurrentUser) return false

            if (!this.isSuggestedByCurrentUser) return true
        }
    }

    constructor(
        private _formBuilder: FormBuilder,
        private _suggestionService: SuggestionService
    ) {
        this.form = this._formBuilder.group({
            paymentType: ['cash', Validators.required],
            price: [200, [Validators.required, Validators.min(200)]],
            commentary: ''
        })
    }

    showDialog(): void {
        this.isShowDialog = true
    }

    onSubmit(): void {
        if (
            this.form.valid &&
            this.signedInUser &&
            this.signedInUser.workInfo.isExecutor
        ) {
            this._suggestionService
                .addNewSuggestion({
                    taskId: this.task._id,
                    executorId: this.signedInUser._id,
                    ...this.form.value
                })
                .pipe(takeUntil(this._unsubscriber$))
                .subscribe(console.log)
            return
        }
        console.log('no, you must sign in')
    }
}

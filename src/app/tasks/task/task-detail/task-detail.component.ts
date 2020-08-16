import { Component, Input } from '@angular/core'
import { FormBuilder, Validators, FormGroup } from '@angular/forms'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { SuggestionService, UserService } from 'src/services'

import { IUser, ITask, IPossibleExecutorSuggestion } from 'src/models'

@Component({
    selector: 'app-task-detail',
    templateUrl: './task-detail.component.html',
    styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent {
    @Input() isLoading: boolean = true
    @Input() task: ITask

    isShowDialog: boolean = false
    isUserAlreadySuggested: boolean = false

    form: FormGroup

    editedSuggestion: IPossibleExecutorSuggestion

    private _unsubscriber$ = new Subject()

    get signedInUser(): IUser {
        return this._userService.currentUserListener$.value
    }

    get isMyTask(): boolean {
        return this.task?.author._id === this.signedInUser?._id
    }

    get isSuggestedByCurrentUser(): boolean {
        return (
            this.task?.suggestions.findIndex(
                suggestion =>
                    suggestion.executorId._id === this.signedInUser?._id
            ) !== -1
        )
    }
    // TODO I'm sorry. I've tried.
    get isShowSuggestBtn(): boolean {
        if (this.isMyTask) return false
        if (!this.isMyTask) {
            if (this.isSuggestedByCurrentUser) return false
            if (!this.isSuggestedByCurrentUser) return true
        }
    }

    constructor(
        private _formBuilder: FormBuilder,
        private _suggestionService: SuggestionService,
        private _userService: UserService
    ) {
        this.form = this._formBuilder.group({
            paymentType: ['cash', Validators.required],
            price: [200, [Validators.required, Validators.min(200)]],
            commentary: ''
        })
    }

    onEditSuggestion(event: IPossibleExecutorSuggestion) {
        this.editedSuggestion = event
        this.form.get('price').patchValue(this.editedSuggestion.price)
        this.form
            .get('paymentType')
            .patchValue(this.editedSuggestion.paymentType)
        this.form.get('commentary').patchValue(this.editedSuggestion.commentary)

        this.toggleDialog()
    }

    toggleDialog(): void {
        this.isShowDialog = !this.isShowDialog
    }

    onSaveSuggestion(): void {
        if (this.form.valid && this.signedInUser) {
            this._suggestionService
                .updateSuggestion(this.editedSuggestion._id, this.form.value)
                .pipe(takeUntil(this._unsubscriber$))
                .subscribe(() => this.toggleDialog())
        }
    }

    onCreateSuggestion(): void {
        if (
            this.form.valid &&
            this.signedInUser &&
            this.signedInUser.workInfo.isExecutor
        ) {
            this.isUserAlreadySuggested = true
            this._suggestionService
                .addNewSuggestion({
                    taskId: this.task._id,
                    executorId: this.signedInUser._id,
                    ...this.form.value
                })
                .pipe(takeUntil(this._unsubscriber$))
                .subscribe(() => this.toggleDialog())
            return
        }
        console.log('no, you must sign in')
    }

    ngOnDestroy(): void {
        this._unsubscriber$.next(true)
        this._unsubscriber$.complete()
    }
}

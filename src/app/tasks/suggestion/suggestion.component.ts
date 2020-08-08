import {
    Component,
    Input,
    OnDestroy,
    Output,
    EventEmitter
} from '@angular/core'
import { Router } from '@angular/router'

import { Subject } from 'rxjs'
import { takeUntil, flatMap } from 'rxjs/operators'

import { TaskService, UserService, SuggestionService } from 'src/services'

import { IPossibleExecutorSuggestion, IUser } from 'src/models'

@Component({
    selector: 'app-suggestion',
    templateUrl: './suggestion.component.html',
    styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnDestroy {
    @Input() suggestion: IPossibleExecutorSuggestion
    @Input() chosedExecutor: string
    @Input() isMyTask: boolean

    @Output() onEdit = new EventEmitter()

    signedInUser: IUser

    private _unsubscriber$ = new Subject()

    get isShowBtn(): boolean {
        if (this.isMyTask === false) return false
        else if (this.chosedExecutor) return false
        else return true
    }

    constructor(
        private _router: Router,
        private _taskService: TaskService,
        private _userService: UserService,
        private _suggestionService: SuggestionService
    ) {
        this._userService.currentUserListener$
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe(response => (this.signedInUser = response))
    }

    onSelectClick(executorId: string): void {
        this._taskService
            .updateTask(this.suggestion.taskId, {
                executor: executorId
            })
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe(response => {
                if (response.data.updatedTask.executor._id === executorId)
                    this.chosedExecutor = executorId
            })
    }

    onCancelClick(): void {
        this.deleteExecutorFromTask()
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe(() => (this.chosedExecutor = null))
    }

    onEditClick(suggestion): void {
        this.onEdit.emit(suggestion)
    }

    onDeleteClick(id: string): void {
        this._suggestionService
            .deleteSuggestion(id)
            .pipe(
                takeUntil(this._unsubscriber$),
                flatMap(_ => this.deleteExecutorFromTask())
            )
            .subscribe(() => (this.chosedExecutor = null))
    }

    deleteExecutorFromTask() {
        return this._taskService.updateTask(this.suggestion.taskId, {
            executor: null
        })
    }

    navigateToUserProfile(id: string): void {
        this._router.navigate(['profile', id])
    }

    ngOnDestroy(): void {
        this._unsubscriber$.next(true)
        this._unsubscriber$.complete()
    }
}

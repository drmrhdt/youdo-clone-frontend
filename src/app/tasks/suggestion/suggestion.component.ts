import {
    Component,
    Input,
    OnDestroy,
    Output,
    EventEmitter
} from '@angular/core'
import { Router } from '@angular/router'

import { Subject, Observable } from 'rxjs'
import { takeUntil, flatMap } from 'rxjs/operators'

import { TaskService, UserService, SuggestionService } from 'src/services'

import {
    IPossibleExecutorSuggestion,
    IUser,
    IUserResponse,
    ITaskResponse
} from 'src/models'

@Component({
    selector: 'app-suggestion',
    templateUrl: './suggestion.component.html',
    styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnDestroy {
    @Input() suggestion: IPossibleExecutorSuggestion
    @Input() chosedExecutor: IUser
    @Input() isMyTask: boolean

    @Output() onEdit = new EventEmitter()

    signedInUser: IUser
    isShowModal: boolean = false

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
            .pipe(
                takeUntil(this._unsubscriber$),
                flatMap(response => {
                    if (response.data.updatedTask.executor._id === executorId) {
                        this.chosedExecutor = response.data.updatedTask.executor

                        return this.updateChosedExecutorTaskInfoTotal(
                            response.data.updatedTask.executor,
                            'inc'
                        )
                    }
                })
            )
            .subscribe(() => this.toggleModal())
    }

    onCancelClick(): void {
        this.deleteExecutorFromTask()
            .pipe(
                takeUntil(this._unsubscriber$),
                flatMap(() =>
                    this.updateChosedExecutorTaskInfoTotal(
                        this.chosedExecutor,
                        'dec'
                    )
                )
            )
            .subscribe(() => (this.chosedExecutor = null))
    }

    updateChosedExecutorTaskInfoTotal(
        executor,
        action: 'inc' | 'dec'
    ): Observable<IUserResponse> {
        const taskInfo = {
            ...executor.taskInfo,
            total:
                action === 'inc'
                    ? ++executor.taskInfo.total
                    : --executor.taskInfo.total
        }

        return this._userService.updateUser(executor._id, {
            taskInfo
        })
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

    deleteExecutorFromTask(): Observable<ITaskResponse> {
        return this._taskService.updateTask(this.suggestion.taskId, {
            executor: null
        })
    }

    navigateToUserProfile(id: string): void {
        this._router.navigate(['profile', id])
    }

    toggleModal(): void {
        this.isShowModal = !this.isShowModal
    }

    ngOnDestroy(): void {
        this._unsubscriber$.next(true)
        this._unsubscriber$.complete()
    }
}

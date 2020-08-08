import { Component, Input, OnDestroy } from '@angular/core'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { TaskService, UserService } from 'src/services'

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

    signedInUser: IUser

    private _unsubscriber$ = new Subject()

    get isShowBtn(): boolean {
        if (this.isMyTask === false) return false
        else if (this.chosedExecutor) return false
        else return true
    }

    constructor(
        private _taskService: TaskService,
        private _userService: UserService
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
        this._taskService
            .updateTask(this.suggestion.taskId, {
                executor: null
            })
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe(() => (this.chosedExecutor = null))
    }

    ngOnDestroy(): void {
        this._unsubscriber$.next(true)
        this._unsubscriber$.complete()
    }
}

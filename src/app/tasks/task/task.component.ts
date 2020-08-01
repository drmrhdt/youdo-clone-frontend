import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'

import { Subject } from 'rxjs'
import { takeUntil, flatMap } from 'rxjs/operators'

import { UserService, TaskService } from 'src/services'

import { ITask, IUser, ITaskResponse } from 'src/models'

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
    isLoading: boolean = true
    task: ITask

    private _unsubscriber$ = new Subject()

    constructor(
        private _route: ActivatedRoute,
        private _taskService: TaskService,
        private _userService: UserService
    ) {}

    ngOnInit(): void {
        this._route.params
            .pipe(
                takeUntil(this._unsubscriber$),
                flatMap((params: Params) =>
                    this._taskService.getTaskById(
                        params['taskId'],
                        this._userService.currentUserListener$?.value
                    )
                )
            )
            .subscribe((response: ITaskResponse) => {
                this.task = response.data.task
                this.isLoading = false
            })
    }

    ngOnDestroy(): void {
        this._unsubscriber$.next(true)
        this._unsubscriber$.complete()
    }
}

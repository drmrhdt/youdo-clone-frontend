import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subject } from 'rxjs'
import { takeUntil, flatMap } from 'rxjs/operators'

import { UserService, TaskService } from 'src/services'

import { ITask, IUser, ITaskResponse } from 'src/models'

@Component({
    selector: 'app-task-page',
    templateUrl: './task-page.component.html',
    styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit, OnDestroy {
    isLoading: boolean = true
    task: ITask
    signedInUser: IUser

    private _unsubscriber$ = new Subject()

    constructor(
        private _route: ActivatedRoute,
        private _taskService: TaskService,
        private _userService: UserService
    ) {}

    ngOnInit(): void {
        const _id = this._route.snapshot.params.taskId

        // TODO temp fix
        setTimeout(() => {
            if (_id) {
                this._userService.currentUserListener$
                    .pipe(
                        takeUntil(this._unsubscriber$),
                        flatMap((response: IUser) => {
                            if (response) {
                                this.signedInUser = response
                                return this._taskService.getTaskById(
                                    _id,
                                    this.signedInUser._id
                                )
                            }
                        })
                    )
                    .subscribe((response: ITaskResponse) => {
                        this.task = response.data.task
                        this.isLoading = false
                    })
            }
        }, 500)
    }

    ngOnDestroy(): void {
        this._unsubscriber$.next(true)
        this._unsubscriber$.complete()
    }
}

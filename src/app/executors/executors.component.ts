import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { UserService } from 'src/services'

import { IUser, IUsersResponse, Filters } from 'src/models'

@Component({
    selector: 'app-executors',
    templateUrl: './executors.component.html',
    styleUrls: ['./executors.component.scss']
})
export class ExecutorsComponent implements OnInit, OnDestroy {
    tab: string
    users: IUser[] = []
    filters = Filters

    private _unsubscriber$ = new Subject()

    constructor(
        private _route: ActivatedRoute,
        private _userService: UserService
    ) {}

    ngOnInit(): void {
        this._userService
            .getExecutors()
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe(
                (response: IUsersResponse) => (this.users = response.data.users)
            )

        this._route.queryParams
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe(queryParams => {
                this._userService
                    .getExecutors(queryParams)
                    .pipe(takeUntil(this._unsubscriber$))
                    .subscribe(
                        (response: IUsersResponse) =>
                            (this.users = response.data.users)
                    )
            })
    }

    ngOnDestroy(): void {
        this._unsubscriber$.next(true)
        this._unsubscriber$.complete()
    }

    onTabClick(filter: string): void {
        this.tab = filter
    }
}

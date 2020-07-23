import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { UserService } from 'src/services'

import { IUser, IUserResponse } from 'src/models'

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
    get idFromUrl(): string {
        return this._route.snapshot.paramMap.get('id')
    }

    get isMyProfile(): boolean {
        return this.idFromUrl === this.signedInUserId
    }

    user: IUser
    signedInUserId: string = ''

    private _unsubscriber$ = new Subject()

    constructor(
        private _route: ActivatedRoute,
        private _userService: UserService
    ) {}

    ngOnInit(): void {
        this._userService.currentUserListener$
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe((response: IUser) => {
                if (response) this.signedInUserId = response._id
            })

        if (!this.isMyProfile)
            this._userService
                .getUserInfoById(this.idFromUrl)
                .pipe(takeUntil(this._unsubscriber$))
                .subscribe((response: IUserResponse) => {
                    this.user = response.data.findedByIdUser
                })
        else
            this._userService.currentUserListener$
                .pipe(takeUntil(this._unsubscriber$))
                .subscribe((response: IUser) => {
                    this.user = response
                })
    }

    ngOnDestroy(): void {
        this._unsubscriber$.next(true)
        this._unsubscriber$.complete()
    }
}

import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subject, EMPTY } from 'rxjs'
import { takeUntil, flatMap } from 'rxjs/operators'

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
        return this.idFromUrl === this.signedInUser?._id
    }

    user: IUser
    signedInUser: IUser

    private _unsubscriber$ = new Subject()

    constructor(
        private _route: ActivatedRoute,
        private _userService: UserService
    ) {}

    ngOnInit(): void {
        this._userService.currentUserListener$
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe((response: IUser) => {
                if (response) this.signedInUser = response
            })

        this._route.params
            .pipe(
                takeUntil(this._unsubscriber$),
                flatMap(params => {
                    this.user = this.isMyProfile ? this.signedInUser : null
                    return !this.user
                        ? this._userService.getUserById(params['id'])
                        : EMPTY
                })
            )
            .subscribe(response => {
                if (response) this.user = response.data.findedByIdUser
            })
    }

    ngOnDestroy(): void {
        this._unsubscriber$.next(true)
        this._unsubscriber$.complete()
    }
}

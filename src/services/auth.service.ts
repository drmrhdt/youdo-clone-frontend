import { Injectable, OnDestroy, Injector } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'

import { BehaviorSubject, Observable, Subject, of } from 'rxjs'
import { takeUntil, flatMap } from 'rxjs/operators'

import { baseUrl } from 'src/environments'

import { UserService } from './user.service'

import {
    IAuthSignUpResponse,
    IAuthSignInResponse,
    IAuthSignUpRequest,
    IAuthSignInRequest,
    IUserResponse
} from 'src/models'

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {
    private _token: string = ''
    private _authStatusListener$ = new BehaviorSubject<boolean>(false)
    private _unsubscriber$ = new Subject()

    get _router(): Router {
        return this._injector.get(Router)
    }

    constructor(
        private _injector: Injector,
        private _httpClient: HttpClient,
        private _userService: UserService
    ) {}

    ngOnDestroy(): void {
        this._unsubscriber$.next(true)
        this._unsubscriber$.complete()
    }

    getToken(): string {
        return this._token || localStorage.getItem('token')
    }

    getAuthStatusListener(): Observable<boolean> {
        return this._authStatusListener$.asObservable()
    }

    signUp(body: IAuthSignUpRequest): void {
        this._httpClient
            .post<IAuthSignUpResponse>(`${baseUrl}/users/signup`, body)
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe((response: IAuthSignUpResponse) => {
                this._token = response.token
                this._authStatusListener$.next(true)
                this._router.navigateByUrl('/')
                this._saveAuthData(this._token)
            })
    }

    signIn(body: IAuthSignInRequest): void {
        this._httpClient
            .post<IAuthSignInResponse>(`${baseUrl}/users/login`, body)
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe((response: IAuthSignInResponse) => {
                this._token = response.token
                this._authStatusListener$.next(true)
                this._router.navigateByUrl('/')
                this._saveAuthData(this._token)
            })
    }

    signOut(): void {
        this._token = ''
        this._authStatusListener$.next(false)
        this._router.navigateByUrl('/')
        this._clearAuthData()
        this._userService.currentUserListener$.next(null)
    }

    private _autoAuthUser(): void {
        const token = this._getAuthData()

        if (token) {
            this._authStatusListener$.next(true)
        }
    }

    init(): void {
        this._autoAuthUser()
        this.getAuthStatusListener()
            .pipe(
                takeUntil(this._unsubscriber$),
                flatMap(isAuthenticated => {
                    if (isAuthenticated) {
                        return this._userService.getCurrentUser()
                    }
                    return of(false)
                })
            )
            .subscribe((response: IUserResponse) =>
                this._userService.currentUserListener$.next(
                    response ? response.data.currentUser : response
                )
            )
    }

    private _saveAuthData(token: string): void {
        localStorage.setItem('token', token)
    }

    private _clearAuthData(): void {
        localStorage.removeItem('token')
        localStorage.removeItem('signedInUser')
    }

    private _getAuthData(): string {
        const token = localStorage.getItem('token')

        if (!token) {
            return
        }

        return token
    }
}

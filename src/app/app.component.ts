import { Component, OnDestroy } from '@angular/core'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { CategoriesService, UserService, AuthService } from 'src/services'

import { IUserResponse, ICategoriesResponse } from 'src/models'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
	isLoading: boolean = true
	isAuthenticated: boolean = false

	private _unsubscriber$ = new Subject()

	constructor(
		private _authService: AuthService,
		private _categoriesService: CategoriesService,
		private _userService: UserService
	) {}

	ngOnInit(): void {
		this._authService.autoAuthUser()

		// TODO we need send token to the server each time when user reloads page
		this._authService
			.getAuthStatusListener()
			.pipe(takeUntil(this._unsubscriber$))
			.subscribe((response: boolean) => {
				this.isAuthenticated = response
				if (this.isAuthenticated) {
					this._userService
						.getCurrentUserInfo()
						.subscribe((response: IUserResponse) => {
							this._userService.currentUserListener$.next(
								response.data.currentUser
							)
						})
				}
			})

		this._categoriesService
			.getCategoriesWithSubcategories()
			.pipe(takeUntil(this._unsubscriber$))
			.subscribe((response: ICategoriesResponse) => {
				this._categoriesService.categoriesListener$.next(
					response.data.categories
				)
				this.isLoading = false
			})
	}

	ngOnDestroy(): void {
		this._unsubscriber$.next(true)
		this._unsubscriber$.complete()
	}
}

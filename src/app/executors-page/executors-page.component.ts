import { Component, OnInit, OnDestroy } from '@angular/core'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { UserService } from 'src/services'

import { IUser, IUsersResponse, Filters } from 'src/models'

@Component({
	selector: 'app-executors-page',
	templateUrl: './executors-page.component.html',
	styleUrls: ['./executors-page.component.scss']
})
export class ExecutorsPageComponent implements OnInit, OnDestroy {
	tab: string
	users: IUser[] = []
	filters = Filters

	private _unsubscriber$ = new Subject()

	constructor(private _userService: UserService) {}

	ngOnInit(): void {
		this._userService
			.getUsersByFilter('isExecutor', true)
			.pipe(takeUntil(this._unsubscriber$))
			.subscribe(
				(response: IUsersResponse) => (this.users = response.data.users)
			)
	}

	ngOnDestroy(): void {
		this._unsubscriber$.next(true)
		this._unsubscriber$.complete()
	}

	onTabClick(filter: string): void {
		this.tab = filter
	}
}

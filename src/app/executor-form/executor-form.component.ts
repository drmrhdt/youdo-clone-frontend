import { Component, OnDestroy } from '@angular/core'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { UserService } from 'src/services'

@Component({
	selector: 'app-executor-form',
	templateUrl: './executor-form.component.html',
	styleUrls: ['./executor-form.component.scss']
})
export class ExecutorFormComponent implements OnDestroy {
	isSuccess: boolean = false

	private _unsubscriber$ = new Subject()

	constructor(private _userService: UserService) {}

	ngOnDestroy(): void {
		this._unsubscriber$.next(true)
		this._unsubscriber$.complete()
	}

	onSubmit(): void {
		this._userService
			.updateMe({ workInfo: { isExecutor: true } })
			.pipe(takeUntil(this._unsubscriber$))
			.subscribe(() => (this.isSuccess = true))
	}
}

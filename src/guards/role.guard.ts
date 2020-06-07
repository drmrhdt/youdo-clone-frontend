import { Injectable, OnDestroy } from '@angular/core'
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	UrlTree,
	Router
} from '@angular/router'

import { Observable, Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { UserService } from 'src/services'

import { IUser, Roles } from 'src/models'

@Injectable({
	providedIn: 'root'
})
export class RoleGuard implements CanActivate, OnDestroy {
	signedInUserRole: string

	private _unsubscriber$ = new Subject()

	constructor(private userService: UserService, private router: Router) {}

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		this.userService.currentUserListener$
			.pipe(takeUntil(this._unsubscriber$))
			.subscribe((response: IUser) => {
				this.signedInUserRole = response.moderationInfo.role
			})

		const isAdminOrModerator =
			this.signedInUserRole === Roles.admin ||
			this.signedInUserRole === Roles.moderator

		if (!isAdminOrModerator) {
			this.router.navigateByUrl('/')
		}

		return isAdminOrModerator
	}

	ngOnDestroy(): void {
		this._unsubscriber$.next(true)
		this._unsubscriber$.complete()
	}
}

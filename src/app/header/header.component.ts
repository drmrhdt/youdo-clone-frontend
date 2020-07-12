import {
    Component,
    OnInit,
    HostListener,
    ViewChild,
    ElementRef,
    OnDestroy
} from '@angular/core'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

import { UserService, AuthService, CategoriesService } from 'src/services'

import { defaultPage } from '../../config/routes'

import { ICategory, IUser, Roles } from 'src/models'

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
    categories: ICategory[] = []
    defaultPage: number = defaultPage
    isShowDropdown: boolean = false
    isShowDialog: boolean = false
    isAdminOrModerator: boolean = false
    isAuthenticated: boolean = false
    authFormType: string = ''
    modalTitle: string = ''
    id: string = ''

    private _unsubscriber$ = new Subject()

    @ViewChild('createTaskLink') createTaskLink: ElementRef
    @HostListener('document:click')
    onClick(): void {
        if (!this.createTaskLink.nativeElement.contains(event.target))
            this.isShowDropdown = false
    }

    get isTaskFormPage() {
        return location.pathname.includes('tasks-add')
    }

    constructor(
        private _authService: AuthService,
        private _categoriesService: CategoriesService,
        private _userService: UserService
    ) {}

    ngOnInit(): void {
        this._categoriesService.categoriesListener$
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe((response: ICategory[]) => (this.categories = response))

        this._authService
            .getAuthStatusListener()
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe(
                (isAuthenticated: boolean) =>
                    (this.isAuthenticated = isAuthenticated)
            )

        this._userService.currentUserListener$
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe((response: IUser) => {
                if (response) {
                    this.id = response._id
                    this.isAdminOrModerator =
                        response.moderationInfo.role === Roles.admin ||
                        response.moderationInfo.role === Roles.moderator
                }
            })
    }

    ngOnDestroy(): void {
        this._unsubscriber$.next(true)
        this._unsubscriber$.complete()
    }

    showSignUpDialog(): void {
        this.authFormType = 'signUp'
        this.modalTitle = 'Регистрация'
        this.isShowDialog = true
    }

    showSignInDialog(): void {
        this.authFormType = 'signIn'
        this.modalTitle = 'Вход'
        this.isShowDialog = true
    }

    onSignOut(): void {
        this._authService.signOut()
    }
}

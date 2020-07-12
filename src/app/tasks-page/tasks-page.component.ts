import { Component, OnDestroy } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { Subject, combineLatest } from 'rxjs'
import { takeUntil, map } from 'rxjs/operators'

import { TaskService, UserService, CategoriesService } from 'src/services'

import { ITask, ITasksResponse, IUser, ICategory, Filters } from 'src/models'

@Component({
    selector: 'app-tasks-page',
    templateUrl: './tasks-page.component.html',
    styleUrls: ['./tasks-page.component.scss']
})
export class TasksPageComponent implements OnDestroy {
    isLoading: boolean = true
    signedInUserId: string
    tasks: ITask[] = []
    categories: ICategory[] = []
    title: string
    filters = Filters
    tab: Filters = this.filters.Master

    get isMyTasks(): boolean {
        return location.pathname.split('/').includes('tasks-my')
    }

    private _unsubscriber$ = new Subject()

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _categoriesService: CategoriesService,
        private _taskService: TaskService,
        private _userService: UserService
    ) {
        this._userService.currentUserListener$
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe((response: IUser) => {
                if (response) this.signedInUserId = response._id
                this.getTasks(this._route.snapshot.params)
            })

        this._categoriesService.categoriesListener$
            .pipe(takeUntil(this._unsubscriber$))
            .subscribe((response: ICategory[]) => {
                this.categories = response
                this.setTitle()
                this.setInitialTab()
            })

        combineLatest(this._route.params, this._route.queryParams)
            .pipe(
                takeUntil(this._unsubscriber$),
                map(results => ({ params: results[0], query: results[1] }))
            )
            .subscribe(results => {
                this.getTasks(results.params)
                this.setTitle()
            })
    }

    ngOnDestroy(): void {
        this._unsubscriber$.next(true)
        this._unsubscriber$.complete()
    }

    getTasks(params): void {
        const filters = this.filterParams(params)
        this.isLoading = true

        const query = this._route.snapshot.queryParams.filter

        if (!query || query === this.filters.Master) {
            // isMaster
            this._taskService
                .getTasksByFilter(filters)
                .pipe(takeUntil(this._unsubscriber$))
                .subscribe((response: ITasksResponse) => {
                    this.tasks = response.data.tasks
                    this.isLoading = false
                })
        } else if (query === this.filters.Executor) {
            // isSuggestion get tasks from suggestions
            this._taskService
                .getTasksFromSuggestionsByExecutorIdAndFilters(filters)
                .pipe(takeUntil(this._unsubscriber$))
                .subscribe((response: ITasksResponse) => {
                    this.tasks = response.data.tasks
                    this.isLoading = false
                })
        }
    }

    filterParams(params): object {
        const filters = this.isMyTasks ? { authorId: this.signedInUserId } : {}
        for (const key in params) {
            if (
                key === 'page' ||
                params[key] === null ||
                (key === 'category' && params[key] === 'all')
            ) {
                continue
            } else filters[key] = params[key]
        }

        return filters
    }

    setTitle(): void {
        if (this.categories) {
            const categoryFromUrl = this._route.snapshot.params.category

            const findedCategory = this.categories.find(
                (item: ICategory) => item.key === categoryFromUrl
            )

            this.title = findedCategory ? findedCategory.text : 'Все категории'
        }
    }

    setInitialTab(): void {
        this.tab = this.isMyTasks ? this.filters.Executor : this.filters.Rating
    }

    onTabClick(filter: Filters): void {
        this.tab = filter
        this._router.navigate([], { queryParams: { filter } })
    }
}

import { Component, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'

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
	tab: Filters

	get isMyTasks(): boolean {
		return location.pathname.split('/').includes('tasks-my')
	}

	private _unsubscriber$ = new Subject()

	constructor(
		private _route: ActivatedRoute,
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

		this._route.params
			.pipe(takeUntil(this._unsubscriber$))
			.subscribe(params => {
				this.getTasks(params)
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

		this._taskService
			.getTasksByFilter(filters)
			.pipe(takeUntil(this._unsubscriber$))
			.subscribe((response: ITasksResponse) => {
				this.tasks = response.data.tasks
				this.isLoading = false
			})
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
	}
}

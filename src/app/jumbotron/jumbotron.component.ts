import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators'
import { TaskService, CategoriesService } from 'src/services'
import { ITaskResponse, ICategory } from 'src/models'

@Component({
	selector: 'app-jumbotron',
	templateUrl: './jumbotron.component.html',
	styleUrls: ['./jumbotron.component.scss']
})
export class JumbotronComponent implements OnInit {
	isLoading = true
	exampleQuery: string = ''
	inputValue
	firstCategory: ICategory

	private _unsubscriber$ = new Subject()

	constructor(
		private _router: Router,
		private _taskService: TaskService,
		private _categoriesService: CategoriesService
	) {}

	ngOnInit(): void {
		this._taskService
			.getRandomTask()
			.pipe(takeUntil(this._unsubscriber$))
			.subscribe((response: ITaskResponse) => {
				this.exampleQuery = response.data.task[0].description
				this.isLoading = false
			})

		this._categoriesService.categoriesListener$
			.pipe(takeUntil(this._unsubscriber$))
			.subscribe((response: ICategory[]) => (this.firstCategory = response[0]))
	}

	ngOnDestroy(): void {
		this._unsubscriber$.next(true)
		this._unsubscriber$.complete()
	}

	moveTextToInput(): void {
		this.inputValue = this.exampleQuery
	}

	submit(): void {
		this._taskService
			.getMatchingTaskToInput(this.inputValue)
			.pipe(takeUntil(this._unsubscriber$))
			.subscribe((response: ITaskResponse) => {
				const { category, subcategory } = response.data.task
					? response.data.task
					: {
							category: this.firstCategory.key,
							subcategory: this.firstCategory.subcategories[0].code
					  }

				this._router.navigate(
					[`youdo-clone`, `tasks-add`, category, subcategory],
					{ queryParams: { description: this.inputValue } }
				)
				// TODO share this.inputValue through service?
			})
	}
}

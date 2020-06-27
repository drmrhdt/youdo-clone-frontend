import { Component, OnInit, OnDestroy } from '@angular/core'
import { ActivatedRoute } from '@angular/router'

import { Subject } from 'rxjs'
import { takeUntil, flatMap } from 'rxjs/operators'

import { UserService, TaskService, SuggestionService } from 'src/services'

import {
	ITask,
	IUser,
	IPossibleExecutorSuggestion,
	ITaskResponse,
	IUserResponse,
	ISuggestionResponse
} from 'src/models'

@Component({
	selector: 'app-task-page',
	templateUrl: './task-page.component.html',
	styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit, OnDestroy {
	isLoading: boolean = true
	task: ITask
	taskAuthor: IUser
	signedInUser: IUser
	suggestion: IPossibleExecutorSuggestion

	private _unsubscriber$ = new Subject()

	constructor(
		private _route: ActivatedRoute,
		private _taskService: TaskService,
		private _userService: UserService,
		private _suggestionService: SuggestionService
	) {}

	ngOnInit(): void {
		const _id = this._route.snapshot.params.taskId

		if (_id)
			this._taskService
				.getTaskById(_id)
				.pipe(
					takeUntil(this._unsubscriber$),
					flatMap((response: ITaskResponse) => {
						this.task = response.data.task
						return this._userService.currentUserListener$
					}),
					flatMap((response: IUser) => {
						this.signedInUser = response
						return this._suggestionService.getSuggestionByTaskIdAndExecutorId(
							this.task._id,
							this.signedInUser._id
						)
					}),
					flatMap((response: ISuggestionResponse) => {
						this.suggestion = response.data.suggestion
						return this._userService.getUserInfoById(this.task.authorId)
					})
				)
				.subscribe((response: IUserResponse) => {
					this.taskAuthor = response.data.findedByIdUser
					this.isLoading = false
				})
	}

	ngOnDestroy(): void {
		this._unsubscriber$.next(true)
		this._unsubscriber$.complete()
	}
}

import { Component, Input } from '@angular/core'

import { ITask } from 'src/models'

@Component({
	selector: 'app-task-preview',
	templateUrl: './task-preview.component.html',
	styleUrls: ['./task-preview.component.scss']
})
export class TaskPreviewComponent {
	@Input() task: ITask

	constructor() {}
}

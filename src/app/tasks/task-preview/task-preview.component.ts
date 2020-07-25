import { Component, Input } from '@angular/core'
import { Router } from '@angular/router'

import { ITask } from 'src/models'

@Component({
    selector: 'app-task-preview',
    templateUrl: './task-preview.component.html',
    styleUrls: ['./task-preview.component.scss']
})
export class TaskPreviewComponent {
    @Input() task: ITask

    constructor(private _router: Router) {}

    selectTask(id: string): void {
        this._router.navigate([id])
    }
}

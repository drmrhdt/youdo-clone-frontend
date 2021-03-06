import { Component, Input } from '@angular/core'

import { IUser } from 'src/models'

@Component({
    selector: 'app-task-author',
    templateUrl: './task-author.component.html',
    styleUrls: ['./task-author.component.scss']
})
export class TaskAuthorComponent {
    @Input() taskAuthor: IUser
}

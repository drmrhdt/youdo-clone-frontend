import { Component, Input } from '@angular/core'

import { ICategory } from 'src/models'

@Component({
    selector: 'app-dropdown-list',
    templateUrl: './dropdown-list.component.html',
    styleUrls: ['./dropdown-list.component.scss']
})
export class DropdownListComponent {
    @Input() categories: ICategory[] = []
}

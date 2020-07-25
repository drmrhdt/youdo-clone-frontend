import { Component, Input, TemplateRef } from '@angular/core'

@Component({
    selector: 'app-section-header',
    templateUrl: './section-header.component.html',
    styleUrls: ['./section-header.component.scss']
})
export class SectionHeaderComponent {
    @Input() title: string
    @Input() bodyComponent: TemplateRef<any>
}

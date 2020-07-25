import { Component, Input } from '@angular/core'

import { IPossibleExecutorSuggestion } from 'src/models'

@Component({
    selector: 'app-suggestion',
    templateUrl: './suggestion.component.html',
    styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent {
    @Input() suggestion: IPossibleExecutorSuggestion
}

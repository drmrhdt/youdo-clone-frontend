import { Component, Input } from '@angular/core'
import { IUser } from 'src/models/IUser.model'

@Component({
    selector: 'app-profile-summary',
    templateUrl: './profile-summary.component.html',
    styleUrls: ['./profile-summary.component.scss']
})
export class ProfileSummaryComponent {
    @Input() user: IUser
    @Input() isMyProfile: boolean = false

    get userIsOnline(): boolean {
        return window.navigator.onLine
    }

    get userAge(): number {
        return (
            new Date().getFullYear() -
            new Date(this.user.personalInfo.birthday).getFullYear()
        )
    }
}

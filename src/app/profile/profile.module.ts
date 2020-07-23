import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '../shared/shared.module'
import { RouterModule } from '@angular/router'

import { ProfileComponent, ProfileSummaryComponent } from '.'

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: ProfileComponent }]),
        CommonModule,
        SharedModule
    ],
    declarations: [ProfileComponent, ProfileSummaryComponent],
    exports: [ProfileComponent]
})
export class ProfileModule {}

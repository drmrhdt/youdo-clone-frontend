import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '../shared/shared.module'
import { RouterModule } from '@angular/router'

import { ProfilePageComponent, ProfileSummaryComponent } from '.'

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: ProfilePageComponent }]),
        CommonModule,
        SharedModule
    ],
    declarations: [ProfilePageComponent, ProfileSummaryComponent],
    exports: [ProfilePageComponent]
})
export class ProfilePageModule {}

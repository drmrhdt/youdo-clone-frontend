import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { ProfilePageRoutingModule } from './profile-page-routing.module'
import { ProfilePageComponent, ProfileSummaryComponent } from '.'

import { SharedModule } from '../shared/shared.module'

@NgModule({
    imports: [CommonModule, ProfilePageRoutingModule, SharedModule],
    declarations: [ProfilePageComponent, ProfileSummaryComponent],
    exports: [ProfilePageComponent]
})
export class ProfilePageModule {}

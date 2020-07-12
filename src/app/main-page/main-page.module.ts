import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared/shared.module'

import { JumbotronComponent } from '../jumbotron/jumbotron.component'
import { MainPageComponent } from './main-page.component'
import { FormsModule } from '@angular/forms'

@NgModule({
    imports: [CommonModule, RouterModule, SharedModule, FormsModule],
    declarations: [JumbotronComponent, MainPageComponent],
    exports: [MainPageComponent]
})
export class MainPageModule {}

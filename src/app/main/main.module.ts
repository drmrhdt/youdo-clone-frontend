import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { RouterModule } from '@angular/router'

import { SharedModule } from '../shared/shared.module'

import { JumbotronComponent } from './jumbotron/jumbotron.component'
import { MainComponent } from './main.component'

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: JumbotronComponent }]),
        CommonModule,
        FormsModule,
        SharedModule
    ],
    declarations: [MainComponent, JumbotronComponent],
    exports: [MainComponent]
})
export class MainModule {}

import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '../shared/shared.module'
import { RouterModule } from '@angular/router'

import { ExecutorsPageComponent, ExecutorPreviewComponent } from '.'

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: '', component: ExecutorsPageComponent }
        ]),
        CommonModule,
        SharedModule
    ],
    declarations: [ExecutorsPageComponent, ExecutorPreviewComponent],
    exports: [ExecutorsPageComponent]
})
export class ExecutorsPageModule {}

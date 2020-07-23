import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { SharedModule } from '../shared/shared.module'
import { RouterModule } from '@angular/router'

import { ExecutorsComponent, ExecutorPreviewComponent } from '.'

@NgModule({
    imports: [
        RouterModule.forChild([{ path: '', component: ExecutorsComponent }]),
        CommonModule,
        SharedModule
    ],
    declarations: [ExecutorsComponent, ExecutorPreviewComponent],
    exports: [ExecutorsComponent]
})
export class ExecutorsModule {}

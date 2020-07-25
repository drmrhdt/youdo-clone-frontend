import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from '../shared/shared.module'

import {
    TasksContainerComponent,
    TasksComponent,
    AuthGuard,
    FormComponent,
    TaskComponent,
    TaskPreviewComponent,
    TaskDetailComponent,
    TaskAuthorComponent,
    SuggestionComponent
} from '.'

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: TasksContainerComponent,
                children: [
                    {
                        path: 'all',
                        component: TasksComponent
                    },
                    {
                        path: 'my',
                        component: TasksComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'add',
                        component: FormComponent
                    },
                    { path: ':taskId', component: TaskComponent }
                ]
            }
        ]),
        CommonModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        TasksComponent,
        TaskComponent,
        TaskPreviewComponent,
        TaskDetailComponent,
        TaskAuthorComponent,
        FormComponent,
        TasksContainerComponent,
        SuggestionComponent
    ],
    exports: [TasksContainerComponent]
})
export class TasksModule {}

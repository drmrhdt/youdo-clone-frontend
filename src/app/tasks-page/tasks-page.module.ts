import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { RouterModule } from '@angular/router'
import { ReactiveFormsModule } from '@angular/forms'

import { SharedModule } from '../shared/shared.module'

import {
    TasksContainerComponent,
    TasksPageComponent,
    AuthGuard,
    FormComponent,
    TaskPageComponent,
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
                        component: TasksPageComponent
                    },
                    {
                        path: 'my',
                        component: TasksPageComponent,
                        canActivate: [AuthGuard]
                    },
                    {
                        path: 'add',
                        component: FormComponent
                    },
                    { path: ':taskId', component: TaskPageComponent }
                ]
            }
        ]),
        CommonModule,
        SharedModule,
        ReactiveFormsModule
    ],
    declarations: [
        TasksPageComponent,
        TaskPageComponent,
        TaskPreviewComponent,
        TaskDetailComponent,
        TaskAuthorComponent,
        FormComponent,
        TasksContainerComponent,
        SuggestionComponent
    ],
    exports: [TasksContainerComponent]
})
export class TasksPageModule {}

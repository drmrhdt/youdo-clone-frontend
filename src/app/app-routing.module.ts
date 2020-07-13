import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from 'src/guards'

import { ExecutorFormComponent } from './executor-form/executor-form.component'

const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: '/youdo-clone',
    //     pathMatch: 'full'
    // },
    {
        path: '',
        loadChildren: () =>
            import('./main-page/main-page.module').then(m => m.MainPageModule)
    },
    {
        path: 'tasks',
        loadChildren: () =>
            import('./tasks-page/tasks-page.module').then(
                m => m.TasksPageModule
            )
    },
    {
        path: 'executors',
        loadChildren: () =>
            import('./executors-page/executors-page.module').then(
                m => m.ExecutorsPageModule
            )
    },
    {
        path: 'profile/:id',
        loadChildren: () =>
            import('./profile-page/profile-page.module').then(
                m => m.ProfilePageModule
            )
    },
    {
        path: 'verification/personalinfo',
        component: ExecutorFormComponent
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}

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
        loadChildren: () => import('./main/main.module').then(m => m.MainModule)
    },
    {
        path: 'tasks',
        loadChildren: () =>
            import('./tasks/tasks.module').then(m => m.TasksModule)
    },
    {
        path: 'executors',
        loadChildren: () =>
            import('./executors/executors.module').then(m => m.ExecutorsModule)
    },
    {
        path: 'profile/:id',
        loadChildren: () =>
            import('./profile/profile.module').then(m => m.ProfileModule)
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

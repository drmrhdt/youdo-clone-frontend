import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { AuthGuard } from 'src/guards'

import { JumbotronComponent } from './jumbotron/jumbotron.component'
import { FormComponent } from './form/form.component'

import { TasksPageComponent } from './tasks-page/tasks-page.component'
import { TaskPageComponent } from './tasks-page/task-page/task-page.component'

import { ExecutorsPageComponent } from './executors-page/executors-page.component'
import { ExecutorFormComponent } from './executor-form/executor-form.component'

import { ProfilePageComponent } from './profile-page/profile-page.component'

const routes: Routes = [
	{
		path: '',
		redirectTo: '/youdo-clone',
		pathMatch: 'full'
	},
	{ path: 'youdo-clone', component: JumbotronComponent },
	{
		path: 'youdo-clone/tasks-my',
		component: TasksPageComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'youdo-clone/tasks-my/:category/:page',
		component: TasksPageComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'youdo-clone/tasks-my/:category/:subcategory/:page',
		component: TasksPageComponent,
		canActivate: [AuthGuard]
	},
	{
		path: 'youdo-clone/tasks',
		component: TasksPageComponent
	},
	{
		path: 'youdo-clone/tasks/:category/:page',
		component: TasksPageComponent
	},
	{
		path: 'youdo-clone/tasks/:category/:subcategory/:page',
		component: TasksPageComponent
	},
	{
		path: 'youdo-clone/tasks-add/:category/:subcategory',
		component: FormComponent
	},
	{ path: 'youdo-clone/tasks/:taskId', component: TaskPageComponent },
	{
		path: 'youdo-clone/executors',
		component: ExecutorsPageComponent
	},
	{
		path: 'youdo-clone/executors/:category/:page',
		component: ExecutorsPageComponent
	},
	{
		path: 'youdo-clone/executors/:category/:subcategory/:page',
		component: ExecutorsPageComponent
	},
	{ path: 'youdo-clone/profile/:id', component: ProfilePageComponent },
	{
		path: 'youdo-clone/verification/personalinfo',
		component: ExecutorFormComponent
	}
]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
	providers: [AuthGuard]
})
export class AppRoutingModule {}

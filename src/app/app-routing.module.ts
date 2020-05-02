import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { JumbotronComponent } from "./jumbotron/jumbotron.component";
import { FormComponent } from "./form/form.component";
import { TasksPageComponent } from "./tasks-page/tasks-page.component";
import { TaskPageComponent } from "./tasks-page/task-page/task-page.component";
import { ExecutorsPageComponent } from "./executors-page/executors-page.component";
import { AuthGuard } from "./guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/youdo",
    pathMatch: "full",
  },
  { path: "youdo", component: JumbotronComponent },
  { path: "youdo/tasks/add/:category/:subcategory", component: FormComponent },
  {
    path: "youdo/tasks/:category/:page",
    component: TasksPageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "youdo/tasks/:category/:subcategory/:page",
    component: TasksPageComponent,
  },
  { path: "youdo/tasks/:taskId", component: TaskPageComponent },
  {
    path: "youdo/executors/:category/:page",
    component: ExecutorsPageComponent,
  },
  {
    path: "youdo/executors/:category/:subcategory/:page",
    component: ExecutorsPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}

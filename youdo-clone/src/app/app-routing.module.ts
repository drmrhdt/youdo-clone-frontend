import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { JumbotronComponent } from "./jumbotron/jumbotron.component";
import { FormComponent } from "./form/form.component";
import { TasksPageComponent } from "./tasks-page/tasks-page.component";
import { TaskPageComponent } from "./task-page/task-page.component";
import { ExecutorsPageComponent } from "./executors-page/executors-page.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/youdo",
    pathMatch: "full"
  },
  { path: "youdo", component: JumbotronComponent },
  { path: "youdo/task/new/:category/:subcategory", component: FormComponent },
  { path: "youdo/tasks/:category/:page", component: TasksPageComponent },
  { path: "youdo/task/:taskId", component: TaskPageComponent },
  { path: "youdo/executors", component: ExecutorsPageComponent },
  { path: "youdo/executors/:category/:subcategory", component: ExecutorsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

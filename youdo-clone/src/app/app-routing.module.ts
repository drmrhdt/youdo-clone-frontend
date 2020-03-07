import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { JumbotronComponent } from "./jumbotron/jumbotron.component";
import { FormComponent } from "./form/form.component";
import { TasksPageComponent } from "./tasks-page/tasks-page.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/youdo",
    pathMatch: "full"
  },
  { path: "youdo", component: JumbotronComponent },
  { path: "youdo/task/new/:category/:subcategory", component: FormComponent },
  { path: "youdo/tasks-all-any-all-1", component: TasksPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

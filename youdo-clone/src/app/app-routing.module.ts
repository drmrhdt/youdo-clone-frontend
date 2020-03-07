import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { JumbotronComponent } from "./jumbotron/jumbotron.component";
import { FormComponent } from "./form/form.component";
import { TaskPreviewComponent } from "./task-preview/task-preview.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/youdo",
    pathMatch: "full"
  },
  { path: "youdo", component: JumbotronComponent },
  { path: "youdo/task/new/:category/:subcategory", component: FormComponent },
  { path: "youdo/tasks-all-any-all-1", component: TaskPreviewComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

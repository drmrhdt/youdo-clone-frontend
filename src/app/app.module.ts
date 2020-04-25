import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { JumbotronComponent } from "./jumbotron/jumbotron.component";
import { DropdownListComponent } from "./dropdown-list/dropdown-list.component";
import { FormComponent } from "./form/form.component";
import { TaskComponent } from "./tasks-page/task-preview/task-preview.component";
import { TasksPageComponent } from "./tasks-page/tasks-page.component";
import { CategoriesListComponent } from "./shared/categories-list/categories-list.component";
import { VerificationBannerComponent } from "./shared/verification-banner/verification-banner.component";
import { FilterHeaderComponent } from "./shared/filter-header/filter-header.component";
import { TaskPageComponent } from "./tasks-page/task-page/task-page.component";
import { TaskDetailComponent } from "./tasks-page/task-page/task-detail/task-detail.component";
import { ExecutorsPageComponent } from "./executors-page/executors-page.component";
import { ExecutorPreviewComponent } from "./executors-page/executor-preview/executor-preview.component";
import { PopupComponent } from './shared/popup/popup.component';
import { AuthFormComponent } from './auth-form/auth-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    JumbotronComponent,
    DropdownListComponent,
    FormComponent,
    TaskComponent,
    TasksPageComponent,
    CategoriesListComponent,
    VerificationBannerComponent,
    FilterHeaderComponent,
    TaskPageComponent,
    TaskDetailComponent,
    ExecutorsPageComponent,
    ExecutorPreviewComponent,
    PopupComponent,
    AuthFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

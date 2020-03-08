import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule, FormsModule, FormControl } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";

import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { JumbotronComponent } from "./jumbotron/jumbotron.component";
import { DropdownListComponent } from "./dropdown-list/dropdown-list.component";
import { FormComponent } from "./form/form.component";
import { TaskPreviewComponent } from "./task-preview/task-preview.component";
import { TasksPageComponent } from "./tasks-page/tasks-page.component";
import { CategoriesListComponent } from "./categories-list/categories-list.component";
import { VerificationBannerComponent } from "./verification-banner/verification-banner.component";
import { FilterHeaderComponent } from "./filter-header/filter-header.component";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    JumbotronComponent,
    DropdownListComponent,
    FormComponent,
    TaskPreviewComponent,
    TasksPageComponent,
    CategoriesListComponent,
    VerificationBannerComponent,
    FilterHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

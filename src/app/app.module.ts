import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'

import { HeaderComponent } from './header/header.component'

import { JumbotronComponent } from './jumbotron/jumbotron.component'

import { DropdownListComponent } from './dropdown-list/dropdown-list.component'

import { FormComponent } from './form/form.component'

import { CategoriesListComponent } from './shared/categories-list/categories-list.component'
import { VerificationBannerComponent } from './shared/verification-banner/verification-banner.component'
import { SectionHeaderComponent } from './shared/section-header/section-header.component'
import { ModalComponent } from './shared/modal/modal.component'
import { LayoutComponent } from './shared/layout/layout.component'
import { ButtonComponent } from './shared/button/button.component'

import { TaskPreviewComponent } from './tasks-page/task-preview/task-preview.component'
import { TasksPageComponent } from './tasks-page/tasks-page.component'
import { TaskPageComponent } from './tasks-page/task-page/task-page.component'
import { TaskAuthorComponent } from './tasks-page/task-page/task-author/task-author.component'
import { TaskDetailComponent } from './tasks-page/task-page/task-detail/task-detail.component'

import { ExecutorsPageComponent } from './executors-page/executors-page.component'
import { ExecutorPreviewComponent } from './executors-page/executor-preview/executor-preview.component'
import { ExecutorFormComponent } from './executor-form/executor-form.component'

import { AuthFormComponent } from './auth-form/auth-form.component'

import { AuthInterceptor } from 'src/interceptors'

import { ProfilePageComponent } from './profile-page/profile-page.component'
import { ProfileSummaryComponent } from './profile-page/profile-summary/profile-summary.component'

import { SuggestionComponent } from './suggestion/suggestion.component'

import { AuthService } from 'src/services'

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
        SectionHeaderComponent,
        TaskPageComponent,
        TaskDetailComponent,
        ExecutorsPageComponent,
        ExecutorPreviewComponent,
        ModalComponent,
        AuthFormComponent,
        ProfilePageComponent,
        ProfileSummaryComponent,
        ExecutorFormComponent,
        SuggestionComponent,
        LayoutComponent,
        ButtonComponent,
        TaskAuthorComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        {
            provide: APP_INITIALIZER,
            useFactory: (authService: AuthService) => () =>
                Promise.resolve(authService.init()),
            multi: true,
            deps: [AuthService]
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}

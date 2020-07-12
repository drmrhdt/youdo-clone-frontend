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

import { SuggestionComponent } from './suggestion/suggestion.component'

import { AuthService } from 'src/services'

import { SharedModule } from './shared/shared.module'
import { ProfilePageModule } from './profile-page/profile-page.module'

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        JumbotronComponent,
        DropdownListComponent,
        FormComponent,
        TaskPreviewComponent,
        TasksPageComponent,
        TaskPageComponent,
        TaskDetailComponent,
        ExecutorsPageComponent,
        ExecutorPreviewComponent,
        AuthFormComponent,
        ExecutorFormComponent,
        SuggestionComponent,
        TaskAuthorComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        ProfilePageModule
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

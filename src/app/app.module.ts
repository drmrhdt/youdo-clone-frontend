import { BrowserModule } from '@angular/platform-browser'
import { NgModule, APP_INITIALIZER } from '@angular/core'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'

import { HeaderComponent } from './header/header.component'

import { DropdownListComponent } from './dropdown-list/dropdown-list.component'

import { ExecutorFormComponent } from './executor-form/executor-form.component'

import { AuthFormComponent } from './auth-form/auth-form.component'

import { AuthInterceptor } from 'src/interceptors'

import { AuthService } from 'src/services'

import { SharedModule } from './shared/shared.module'
import { ProfilePageModule } from './profile-page/profile-page.module'
import { MainPageModule } from './main-page/main-page.module'
import { ExecutorsPageModule } from './executors-page/executors-page.module'
import { TasksPageModule } from './tasks-page/tasks-page.module'

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        DropdownListComponent,
        ExecutorFormComponent,
        AuthFormComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        ProfilePageModule,
        MainPageModule,
        ExecutorsPageModule,
        TasksPageModule
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

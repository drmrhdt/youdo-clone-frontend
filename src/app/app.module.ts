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
import { ProfileModule } from './profile/profile.module'
import { MainModule } from './main/main.module'
import { ExecutorsModule } from './executors/executors.module'
import { TasksModule } from './tasks/tasks.module'

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
        ProfileModule,
        MainModule,
        ExecutorsModule,
        TasksModule
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

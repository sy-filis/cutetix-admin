import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello/hello.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OAuthModule } from 'angular-oauth2-oidc';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { AuthGuard } from './auth.guard';
import { AdministrationModule } from './administration/administration.module';
import { DataTablesModule } from 'angular-datatables';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AuthInterceptor } from './auth.interceptor.';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HelloComponent,
    NotFoundComponent,
    LoginPageComponent,
    UserProfileComponent,
  ],
  imports: [
    AdministrationModule,
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    OAuthModule.forRoot(),
    RouterModule.forRoot(APP_ROUTES, { useHash: false }),
    DataTablesModule,
    FontAwesomeModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

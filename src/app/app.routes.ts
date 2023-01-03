import { Routes } from '@angular/router';
import { HelloComponent } from './hello/hello.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './administration/dashboard/dashboard.component';
import { AdministrationLayoutComponent } from './administration/layout/layout.component';
import { TimesListComponent } from './administration/times/list/component';
import { TimesNewComponent } from './administration/times/new/component';
import { TimesEditComponent } from './administration/times/edit/component';
import { UserProfileComponent } from './user-profile/user-profile.component';

export let APP_ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HelloComponent,
  },
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: '',
    component: AdministrationLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'profile',
        component: UserProfileComponent
      },
      {
        path: 'times',
        children: [
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'list',
          },
          {
            path: 'list',
            component: TimesListComponent
          },
          {
            path: 'add',
            component: TimesNewComponent
          },
          {
            path: 'edit/:id',
            component: TimesEditComponent
          },
          {
            path: 'detail/:id',
            component: TimesEditComponent,
          }
        ]
      },
      {
        path: '**',
        pathMatch: 'full',
        component: NotFoundComponent
      }
    ]
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
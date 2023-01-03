import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrationLayoutComponent } from './layout/layout.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { NavBarItemComponent } from './layout/nav-bar-item/nav-bar-item.component';
import { LoggedUserComponent } from './layout/logged-user/logged-user.component';
import { NavBarSubitemComponent } from './layout/nav-bar-subitem/nav-bar-subitem.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from './loading/loading.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TimesListComponent } from './times/list/component';
import { TimesEditComponent } from './times/edit/component';
import { TimesNewComponent } from './times/new/component';

@NgModule({
    declarations: [
        AdministrationLayoutComponent,
        NavBarComponent,
        NavBarItemComponent,
        LoggedUserComponent,
        NavBarSubitemComponent,
        DashboardComponent,
        LoadingComponent,
        TimesListComponent,
        TimesEditComponent,
        TimesNewComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        DataTablesModule,
        FontAwesomeModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        ReactiveFormsModule
    ]
})
export class AdministrationModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DxHttpModule } from 'devextreme-angular/http';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { DxAutocompleteModule, DxButtonModule, DxCheckBoxModule, DxCircularGaugeModule, DxDataGridComponent, DxDataGridModule, DxFormModule, DxLoadIndicatorModule, DxPopupModule, DxSelectBoxModule, DxTemplateModule, DxTextAreaModule, DxTextBoxComponent, DxTextBoxModule } from 'devextreme-angular';
import { ActionComponent } from './action/action.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CreateComplainComponent } from './pages/create-complain/create-complain.component';
import { HttpClientModule } from '@angular/common/http';
import { GuestListComponent } from './pages/guest-list/guest-list.component';
import { ComplainListComponent } from './pages/complain-list/complain-list.component';
import { ComplainDetailComponent } from './pages/complain-detail/complain-detail.component';
import { ComHistoryComponent } from './pages/com-history/com-history.component';
import { ComHistoryDetailComponent } from './pages/com-history-detail/com-history-detail.component';
import { GuestComListComponent } from './pages/guest-com-list/guest-com-list.component';
import { GuestLoginComponent } from './pages/guest-login/guest-login.component';
import { GuestListDetailComponent } from './pages/guest-list-detail/guest-list-detail.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { ManageEmployeeComponent } from './pages/manage-employee/manage-employee.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';

@NgModule({
  declarations: [
    ActionComponent,
    AppComponent,
    CreateComplainComponent,
    GuestListComponent,
    ComplainListComponent,
    ComplainDetailComponent,
    ComHistoryComponent,
    ComHistoryDetailComponent,
    GuestComListComponent,
    GuestLoginComponent,
    GuestListDetailComponent,
    CreateEmployeeComponent,
    CreateEmployeeComponent,
    ManageEmployeeComponent,
    EmployeeDetailComponent,
  ],
  imports: [
    BrowserModule,
    DxHttpModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    DxButtonModule,
    DxPopupModule,
    DxLoadIndicatorModule,
    DxTextAreaModule,
    DxDataGridModule,
    DxTemplateModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    HttpClientModule,
    DxFormModule,
    DxAutocompleteModule,
    DxCircularGaugeModule,
    SweetAlert2Module.forRoot(),
  ],
  providers: [
    AuthService,
    ScreenService,
    AppInfoService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


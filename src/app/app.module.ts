import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DxHttpModule } from 'devextreme-angular/http';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { TestPopupComponent } from './test-popup/test-popup.component';
import { DxButtonModule, DxCircularGaugeModule, DxDataGridComponent, DxDataGridModule, DxFormModule, DxPopupModule, DxTemplateModule, DxTextBoxComponent, DxTextBoxModule } from 'devextreme-angular';
import { CalculateComponent } from './Calculate/Calculate.component';
import { ActionComponent } from './action/action.component';
import { TanagornComponent } from './tanagorn/tanagorn.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
      TestPopupComponent,
      CalculateComponent,
      ActionComponent,
      TanagornComponent,
   ],
  imports: [
    BrowserModule,
    DxHttpModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    DxButtonModule,
    DxPopupModule,

    DxDataGridModule,
    DxTemplateModule,
    DxTextBoxModule,
    DxFormModule,
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


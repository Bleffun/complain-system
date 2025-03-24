import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DxHttpModule } from 'devextreme-angular/http';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { DxButtonModule, DxCircularGaugeModule, DxDataGridComponent, DxDataGridModule, DxFormModule, DxLoadPanelModule, DxPopupModule, DxTemplateModule, DxTextBoxComponent, DxTextBoxModule } from 'devextreme-angular';
import { ActionComponent } from './action/action.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FooterModule, LoginFormModule } from './shared/components';
import { TaskListComponent } from './pages/Task-list/Task-list.component';
import { GuestPagesComponent } from './pages/guest-pages/guest-pages.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ActionComponent,
    TaskListComponent,
    GuestPagesComponent,
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
    DxLoadPanelModule,
    DxDataGridModule,
    HttpClientModule,
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


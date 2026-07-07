import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent } from './shared/components';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { TestPopupComponent } from './test-popup/test-popup.component';
import { AppComponent } from './app.component';
import { GuestListComponent } from './pages/guest-list/guest-list.component';
import { ComplainListComponent } from './pages/complain-list/complain-list.component';
import { ComplainDetailComponent } from './pages/complain-detail/complain-detail.component';
import { ComHistoryComponent } from './pages/com-history/com-history.component';
import { ComHistoryDetailComponent } from './pages/com-history-detail/com-history-detail.component';
import { GuestComListComponent } from './pages/guest-com-list/guest-com-list.component';
import { GuestLoginComponent } from './pages/guest-login/guest-login.component';
import { CreateEmployeeComponent } from './pages/create-employee/create-employee.component';
import { ManageEmployeeComponent } from './pages/manage-employee/manage-employee.component';
import { EmployeeDetailComponent } from './pages/employee-detail/employee-detail.component';

const routes: Routes = [
  {
    path: '', canActivate: [AuthGuardService],
    children: [
      { path: '', component: ComplainListComponent },
      { path: 'ComplainList/:USER_ID', component: ComplainDetailComponent },
      { path: 'History', component: ComHistoryComponent },
      { path: 'History/:USER_ID', component: ComHistoryDetailComponent },
      { path: 'CreateEmployee', component: CreateEmployeeComponent },
      { path: 'ManageEmployee', component: ManageEmployeeComponent },
      { path: 'ManageEmployee/:USER_ID', component: EmployeeDetailComponent }
    ]
  },
  { path: 'guest', component: GuestListComponent },
  { path: 'login-form', component: LoginFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent,

  ]
})
export class AppRoutingModule { }

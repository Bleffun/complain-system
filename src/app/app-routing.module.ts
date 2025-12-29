import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './shared/services';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { LoginFormComponent } from './shared/components';
import { TaskListComponent } from './pages/Task-list/Task-list.component';
import { GuestPagesComponent } from './pages/guest-pages/guest-pages.component';

const routes: Routes = [
  {
    path: "", canActivate: [AuthGuardService],
    children: [
      { path: '', component: TaskListComponent },

    ]
  },
  { path: 'login-form', component: LoginFormComponent, canActivate: [AuthGuardService] },
  { path: 'guest-form', component: GuestPagesComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: [
    HomeComponent,
    ProfileComponent,
    TasksComponent
  ]
})
export class AppRoutingModule { }

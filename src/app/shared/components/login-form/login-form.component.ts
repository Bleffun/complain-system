import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DxFormModule } from 'devextreme-angular/ui/form';
import { DxLoadIndicatorModule } from 'devextreme-angular/ui/load-indicator';
import notify from 'devextreme/ui/notify';
import { AuthService } from '../../services';
import { CallApiService } from '../../services/api/call-api.service';
import Swal from 'sweetalert2';
import { Cache } from '../../services/cache';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  loading = false;
  formData: any = {};
  UserDB: any = [];
  data: any = [];
  constructor(private authService: AuthService,
    private callapi: CallApiService,
  ) { }

  ngOnInit() {

  }

  async onSubmit(e: Event) {
    e.preventDefault();
    const { username, password } = this.formData;
    // this.data = await this.callapi.getUser(username).toPromise() || null;
    // this.UserDB = this.data.body[0]
    // if (this.UserDB) {
    //   if (username == this.UserDB.USER_NAME && password == this.UserDB.USER_PASS) {
    //     this.loading = true;
    //     // Cache.Set("Username",this.UserDB.USER_NAME);
    //     // Cache.Set("Name",this.UserDB.USER_FULLNAME);
    //     // Cache.Set("UserID",this.UserDB.USER_ID);
    const result = await this.authService.logIn(username, password);
    if (!result.isOk) {
      this.loading = false;
      notify(result.message, 'error', 2000);
    }
  }
  // } else {
  //   Swal.fire({
  //     title: "ผิดพลาด",
  //     text: "User หรือ Password ไม่ถูกต้อง",
  //     icon: "warning",
  //     confirmButtonText: "OK",
  //   })
  // }
}


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DxFormModule,
    DxLoadIndicatorModule
  ],
  declarations: [LoginFormComponent],
  exports: [LoginFormComponent]
})
export class LoginFormModule { }

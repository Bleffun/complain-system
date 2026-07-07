import { Component, OnInit, ViewChild } from '@angular/core';
import { CallApiService } from '../../shared/services/call-api.service';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { Confirm, Success } from '../../common/helper';
import { InternalCache } from '../../shared/services/cache';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrl: './create-employee.component.scss'
})
export class CreateEmployeeComponent {
  @ViewChild('myform', { static: false }) myform!: DxFormComponent;
  formData: any = {};
  loading = false;
  _selectRole: any = [];
  data: any = {};
  newRoledata: any = [];
  receiveData: any = {};
  checkUser: any = {};
  constructor(private callapi: CallApiService) { }
  async ngOnInit() {
    this.data = await this.callapi.getRole(InternalCache.Get('roleId')).toPromise();
    this._selectRole = this.data.body;
  }
  async onSubmit() {
    this.receiveData = await this.callapi.getAllusername().toPromise();
    this.checkUser = this.receiveData.body;
    this.data = await this.callapi.getRole(1).toPromise();
    this._selectRole = this.data.body;
    const checksameuser = this.checkUser.filter((item: any) => {
      if (item.USER_NAME == this.formData.USER_NAME) {
        return item;
      }
    })
    if (checksameuser.length >= 1) {
      notify('Username ซ้ำ', 'error', 3000);
      return;
    }
    if (this.myform && this.myform.instance) {
      const validateResult = this.myform.instance.validate();
      if (!validateResult.isValid) {
        notify('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน', 'error', 3000);
        return;
      }
    }
    if (this.formData.USER_PASS != this.formData.USER_PASS_CONFIRM) {
      notify('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน', 'error', 3000);
      return;
    }
    const newrole = this._selectRole.filter((item: any) => {
      if (item.ROLE_NAME == this.formData.ROLE_NAME) {
        return item;
      }
    })
    const isConfirm = await Confirm('ยืนยันการสร้างบัญชี', '');
    if (!isConfirm) {
      this.data = await this.callapi.getRole(InternalCache.Get('roleId')).toPromise();
      this._selectRole = this.data.body;
      return;
    }
    if (newrole.length == 0) {
      const newroletosend = {
        ROLE_NAME: this.formData.ROLE_NAME
      }
      await this.callapi.addRole(newroletosend).toPromise();
      this.newRoledata = this.addnewdata(this._selectRole.length + 1);
    } else {
      this.newRoledata = this.addnewdata(newrole[0].ROLE_ID);
    }
    await this.callapi.addEmp(this.newRoledata).toPromise();
    await Success('สร้างข้อมูลเสร็จสิ้น','');
    location.reload();
  }
  addnewdata(ROLE_ID: any) {
    const formDataToSend = {
      USER_NAME: this.formData.USER_NAME || "",
      USER_FULLNAME: this.formData.USER_FULLNAME || "",
      USER_PASS: this.formData.USER_PASS || "",
      CREATE_DATE: new Date().toISOString() || "",
      ROLE_ID: ROLE_ID || 0,
      USER_DELETED: false,
    };
    return formDataToSend;
  }


}

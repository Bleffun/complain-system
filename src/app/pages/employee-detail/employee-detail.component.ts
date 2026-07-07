import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from '../../shared/services/call-api.service';
import { InternalCache } from '../../shared/services/cache';
import { DxFormComponent } from 'devextreme-angular';
import notify from 'devextreme/ui/notify';
import { Confirm, Success } from '../../common/helper';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrl: './employee-detail.component.scss'
})
export class EmployeeDetailComponent {
  constructor(private router: Router, private callapi: CallApiService) { }
  @ViewChild('myform', { static: false }) myform!: DxFormComponent;
  _formdata: any = {};
  index = 0;
  _selectRole: any = {};
  data: any = {};
  newRoledata: any = {};
  async ngOnInit() {
    this.data = await this.callapi.getRole(InternalCache.Get('roleId')).toPromise();
    this._selectRole = this.data.body;
    if (this.callapi.getData() == "") {
      this.router.navigate(['/ManageEmployee'])
    }
    this._formdata = this.callapi.getData();
  }
  OnBack() {
    this.router.navigate(['/ManageEmployee']);
  }
  async OnEdit() {
    this.data = await this.callapi.getRole(1).toPromise();
    this._selectRole = this.data.body;

    if (this.myform && this.myform.instance) {
      const validateResult = this.myform.instance.validate();
      if (!validateResult.isValid) {
        notify('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน', 'error', 3000);
        return;
      }
    }
    if (!this._formdata.USER_PASS_NEW || !this._formdata.USER_PASS_CONFIRM) {
      if (this._formdata.USER_PASS_NEW != this._formdata.USER_PASS_CONFIRM) {
        notify('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน', 'error', 3000);
        return;
      }
    }
    const newrole = this._selectRole.filter((item: any) => {
      if (item.ROLE_NAME == this._formdata.ROLE_NAME) {
        return item;
      }
    })
    if (newrole.length == 0) {
      const newroletosend = {
        ROLE_NAME: this._formdata.ROLE_NAME
      }
      await this.callapi.addRole(newroletosend).toPromise();
      this.newRoledata = this.editData(this._selectRole.length + 1);
    } else {
      this.newRoledata = this.editData(newrole[0].ROLE_ID);
    }
    const confirmstate = await Confirm('ยืนยันการอัพเดทข้อมูล', '');
    if(!confirmstate){
      return;
    }
    this.callapi.EditUser(this._formdata.USER_ID, this.newRoledata).toPromise();
    await Success('อัพเดทข้อมูลเสร็จสิ้น', '');
    this.router.navigate(['/ManageEmployee']);
  }
  editData(ROLE_ID: any) {
    if (!this._formdata.USER_PASS_NEW) {
      this._formdata.USER_PASS_NEW = this._formdata.USER_PASS
    }
    const formDataToSend = {
      USER_NAME: this._formdata.USER_NAME || "",
      USER_FULLNAME: this._formdata.USER_FULLNAME || "",
      USER_PASS: this._formdata.USER_PASS_NEW || "",
      ROLE_ID: ROLE_ID || 0,
    };
    return formDataToSend;
  }
}

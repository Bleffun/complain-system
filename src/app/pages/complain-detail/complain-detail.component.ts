import { InternalCache } from '../../shared/services/cache';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from './../../shared/services/call-api.service';
import Swal from 'sweetalert2';
import { Confirm } from '../../common/helper';

@Component({
  selector: 'app-complain-detail',
  templateUrl: './complain-detail.component.html',
  styleUrls: ['./complain-detail.component.scss']
})
export class ComplainDetailComponent implements OnInit {
  _formdata: any = [];
  _selectUser: any = [];
  data: any = [];
  _readOnly = true;
  _visible = false;
  _visible2 = false;
  _visible3 = false;
  constructor(private router: Router, private callapi: CallApiService) { }

  async ngOnInit() {
    const roleid = InternalCache.Get("roleId");
    if (roleid <= 2) {
      this._readOnly = false;
      this._visible = true;
    }
    this._formdata = this.callapi.getData();
    if (typeof this._formdata.USER_ID !== 'object') {
      this._readOnly = true;
    }
    if (this._formdata.COM_STATUS == "ผู้รับผิดชอบรับรู้") {
      this._visible2 = true;
    }
    if (typeof this._formdata.COM_EVIDENCE !== 'object') {
      this._visible3 = true;
    }
    if (this.callapi.getData() == "") {
      this.router.navigate(['/'])
    }

    this.data = await this.callapi.getAllUsers().toPromise();
    this._selectUser = this.data.body;
  }
  OnBack() {
    this.router.navigate(['/']);
  }
  async OnSendManager() {
    if (this._formdata.USER_ID <= 0) {
      Swal.fire({
        title: "ผิดพลาด",
        text: "User หรือ Password ไม่ถูกต้อง",
        icon: "warning",
        confirmButtonText: "OK",
      })
    }
    const isConfirmed = await Confirm('ยืนยันการส่ง','')
    if (!isConfirmed) {
      return;
    }
    const sendata = {
      COM_STATUS: 'ผู้รับผิดชอบรับรู้'
    }
    await this.callapi.changeStatus(this._formdata.COM_ID, sendata).toPromise();
    this.router.navigate(['/']);

  }
  async OnSubmit() {
    const isConfirmed = await Confirm('ยืนยันการส่ง','')
    if (!isConfirmed) {
      return;
    }
    const sendata = {
      COM_STATUS: 'ผู้รับผิดชอบรับรู้',
      COM_STATUS2: 'พนักงานรับทราบแล้ว'
    }
    await this.callapi.changeStatus2(this._formdata.COM_ID, sendata).toPromise();
    this.router.navigate(['/']);
  }
  downloadFile(base64Data: string) {
    const base64 = base64Data.replace(/^data:image\/[a-zA-Z]+;base64,/, '');

    try {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: 'image/png' });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'หลักฐาน';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('เกิดข้อผิดพลาดในการแปลง Base64:', error);
    }
  }
}

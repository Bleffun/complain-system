import { Syntax } from './../../../../node_modules/sass/types/options.d';
import { HttpClient } from '@angular/common/http';
import { CallApiService } from './../../shared/services/call-api.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmSend } from '../../common/helper';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import notify from 'devextreme/ui/notify';
import { DxFormComponent } from 'devextreme-angular';

@Component({
  selector: 'app-create-complain',
  templateUrl: './create-complain.component.html',
  styleUrls: ['./create-complain.component.scss']
})
export class CreateComplainComponent implements OnInit {
  @ViewChild('myform', { static: false }) myform!: DxFormComponent;
  _formdata: any = {};
  _selectUser: any = [];
  constructor(private callapi: CallApiService) { }
  base64String: string | null = null;
  fileName: string = '';
  data: any = [];
  // ฟังก์ชันแปลงไฟล์เป็น Base64
  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file); // อ่านไฟล์เป็น Data URL (Base64)
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }

  // ฟังก์ชันเมื่อผู้ใช้เลือกไฟล์
  async onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.fileName = file.name;
      try {
        this.base64String = await this.fileToBase64(file);
      } catch (error) {
        console.error('Error converting file to Base64:', error);
      }
    }
  }

  async ngOnInit() {
    this.data = await this.callapi.getAllUsers().toPromise();
    this._selectUser = this.data.body
    this._formdata.USER_ID = 0;
    this._formdata.CREATE_DATE = new Date().toISOString();
  }
  async OnSend() {
    if (this.myform && this.myform.instance) {
      const validateResult = this.myform.instance.validate();
      if (!validateResult.isValid) {
        notify('กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน', 'error', 3000);
        return;
      }
    }
    if (this._formdata.COM_IDCARD) {
      if (this._formdata.COM_IDCARD.length < 13 || this._formdata.COM_IDCARD == null) {
        notify('รหัสบัตรให้ถูกต้อง', 'error', 2000);
        return;
      }
    }
    const formDataToSend = {
      COM_DETAIL: this._formdata.COM_DETAIL || "",
      COM_IDCARD: this._formdata.COM_IDCARD || "",
      COM_NAME: this._formdata.COM_NAME || "",
      CREATE_DATE: this._formdata.CREATE_DATE || "",
      USER_ID: this._formdata.USER_ID || 0,
      COM_USER_DETAIL: this._formdata.COM_USER_DETAIL || "",
      COM_STATUS: "ส่งเรื่องร้องเรียน",
      COM_EVIDENCE: this.base64String?.toString()
    };
    const isConfirm = await ConfirmSend();
    if (!isConfirm) {
      return;
    }
    console.log(formDataToSend);

    await this.callapi.addComp(formDataToSend).toPromise();
    location.reload();
  }
  async OnBack() {
    location.reload();
  }

}

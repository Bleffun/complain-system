import { Component, OnInit } from '@angular/core';
import { ConfirmSend } from '../../common/helper';
import { Router } from '@angular/router';
import { CallApiService } from './../../shared/services/call-api.service';
import { InternalCache } from './../../shared/services/cache';

@Component({
  selector: 'app-guest-list-detail',
  templateUrl: './guest-list-detail.component.html',
  styleUrls: ['./guest-list-detail.component.scss']
})
export class GuestListDetailComponent implements OnInit {
  _formdata: any = [];
  _selectUser: any = [];
  data: any = [];
  _readOnly = true;
  index = 0;
  constructor(private router: Router, private callapi: CallApiService) { }

  async ngOnInit() {
    this.data = await this.callapi.getAllUsers().toPromise();
    this._selectUser = this.data.body;
    this._formdata = this.callapi.getLog();
  }
  OnBack(e: any) {
    this.callapi.setLog(e);
    this.index = 1;
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



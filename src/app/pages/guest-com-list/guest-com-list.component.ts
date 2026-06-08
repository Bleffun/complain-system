import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from './../../shared/services/call-api.service';
import { InternalCache } from './../../shared/services/cache';

@Component({
  selector: 'app-guest-com-list',
  templateUrl: './guest-com-list.component.html',
  styleUrls: ['./guest-com-list.component.scss']
})
export class GuestComListComponent implements OnInit {
  complainList: any = [];
  data: any = [];
  index = 0;
  constructor(private callapi: CallApiService, private router: Router) { }
  async ngOnInit() {
    const idcard = this.callapi.getLog();
    this.data = await this.callapi.getComplain(idcard).toPromise();
    this.complainList = this.data.body;
    this.complainList
  }
  OnEdit(e: any) {
    this.callapi.setLog(e);
    this.index = 1;
  }
  OnBack() {
    this.index = 2;
  }
  clearObjectValue(rowData: any) {
  const value = rowData.COM_STATUS2;

  // เช็คว่าถ้าค่าเป็น Object และไม่ใช่ null/undefined ให้ส่งค่ากลับเป็น string ว่าง ""
  if (value && typeof value === 'object') {
    return "";
  }
  return value; // ถ้าเป็นค่าธรรมนดาก็ให้แสดงผลปกติ
}
}

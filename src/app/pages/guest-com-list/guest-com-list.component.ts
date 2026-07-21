import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from '../../shared/services/api/call-api.service';
import { Cache } from './../../shared/services/cache';

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
    const idcard = this.callapi.getData();
    this.data = await this.callapi.getComplain(idcard).toPromise();
    this.complainList = this.ConvertDate(this.data.body);
    this.complainList = this.clearObjectValue(this.complainList)
  }
  OnEdit(e: any) {
    this.callapi.setData(e);
    this.index = 1;
  }
  OnBack() {
    this.index = 2;
  }
  clearObjectValue(rowData: any) {
    const cleradata = rowData.map((item: any) => {
      if (typeof item.COM_STATUS2 === 'object') {
        return {
          ...item,
          COM_STATUS2: 'กำลังเดินเรื่อง'
        };
      }
      return item;
    });
    return cleradata
  }
  ConvertDate(date: any) {
    const Newdate = date.map((item: any) => {
      const dateObj = new Date(item.CREATE_DATE);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      const thaiYear = dateObj.getFullYear() + 543;
      return {
        ...item,
        CREATE_DATE: `${day}/${month}/${thaiYear} ${hours}:${minutes}`
      };
    });
    return Newdate;
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CallApiService } from '../../shared/services/api/call-api.service';
import { Router } from '@angular/router';
import { Cache } from './../../shared/services/cache';

@Component({
  selector: 'app-com-history',
  templateUrl: './com-history.component.html',
  styleUrls: ['./com-history.component.scss']
})
export class ComHistoryComponent implements OnInit {

  complainList: any = [];
  data: any = [];
  constructor(private callapi: CallApiService, private router: Router) { }
  @Input() idcard: any;
  async ngOnInit() {
    const username = Cache.Get("UserID");
    if (username) {
      this.data = await this.callapi.getHistory(username).toPromise();
    } else {
      this.data = await this.callapi.getHistory(this.idcard).toPromise();
    }
    this.complainList = this.ConvertDate(this.data.body);

  }
  OnEdit(e: any) {
    this.callapi.setData(e);
    this.router.navigate(['/History/' + e.COM_ID]);
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

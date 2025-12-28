import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-guest-pages',
  templateUrl: './guest-pages.component.html',
  styleUrls: ['./guest-pages.component.scss']
})
export class GuestPagesComponent implements OnInit {
  _isLoading = false;
  index = 0;
  dataList = [
    { title: 'สร้างคำขอร้องเรียน', value: '1' },
    { title: 'เช็คสถานะคำขอ', value: '2' }
  ];
  constructor() { }

  ngOnInit() {
  }
  SelectChange(e:any) {
    this._isLoading = true;
    setTimeout(() => {
      if (e.value === '1') {
        this.index = 1
      }
      else if (e.value === '2') {
        this.index = 2;
      }
      this._isLoading = false;
    }, 300);

    console.log('AA', this.index);
  }
}

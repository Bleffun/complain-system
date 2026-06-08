import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  styleUrls: ['./guest-list.component.scss']
})
export class GuestListComponent implements OnInit {
  index:number = 0;
  List: any = [
    { title: 'สร้างคำขอร้องเรียน', value: '1' },
    { title: 'เช็คสถานะคำขอร้องเรียน', value: '2' },
  ];
  _isload = false;
  constructor() { }

  ngOnInit() {

  }
  Selection(e:any) {
    this._isload = true;
    setTimeout(() => {
      if (e.value === "1") {
        this.index = 1;
      }
      else if(e.value ==="2"){
        this.index = 2;
      }
    })
  }
}

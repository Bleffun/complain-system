import { Router } from '@angular/router';
import { CallApiService } from './../../shared/services/call-api.service';
import { InternalCache } from './../../shared/services/cache';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-complain-list',
  templateUrl: './complain-list.component.html',
  styleUrls: ['./complain-list.component.scss']
})
export class ComplainListComponent implements OnInit {
  complainList: any = [];
  data: any = [];
  constructor(private callapi: CallApiService,private router:Router) { }
  @Input() idcard: any;
  async ngOnInit() {
    const username = InternalCache.Get("UserID");
    if (username) {
      this.data = await this.callapi.getComplain(username).toPromise();
    } else {
      this.data = await this.callapi.getComplain(this.idcard).toPromise();
    }
    this.complainList = this.data.body;

  }
  OnEdit(e:any){
    this.callapi.setData(e);
    this.router.navigate(['/ComplainList/'+e.COM_ID]);
  }
}

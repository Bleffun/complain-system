import { Component, Input, OnInit } from '@angular/core';
import { CallApiService } from './../../shared/services/call-api.service';
import { Router } from '@angular/router';
import { InternalCache } from './../../shared/services/cache';

@Component({
  selector: 'app-com-history',
  templateUrl: './com-history.component.html',
  styleUrls: ['./com-history.component.scss']
})
export class ComHistoryComponent implements OnInit {

   complainList: any = [];
    data: any = [];
    constructor(private callapi: CallApiService,private router:Router) { }
    @Input() idcard: any;
    async ngOnInit() {
      const username = InternalCache.Get("UserID");
      if (username) {
        this.data = await this.callapi.getHistory(username).toPromise();
      } else {
        this.data = await this.callapi.getHistory(this.idcard).toPromise();
      }
      this.complainList = this.data.body;

    }
    OnEdit(e:any){
      console.log(e);
      this.callapi.setData(e);
      this.router.navigate(['/History/'+e.COM_ID]);
    }

}

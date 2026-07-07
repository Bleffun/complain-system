import notify from 'devextreme/ui/notify';
import { Component, OnInit } from '@angular/core';
import { CallApiService } from './../../shared/services/call-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-guest-login',
  templateUrl: './guest-login.component.html',
  styleUrls: ['./guest-login.component.scss']
})
export class GuestLoginComponent implements OnInit {
  loading = false;
  formData: any = {};
  index = 0;
  constructor(private callapi: CallApiService, private router: Router) { }

  ngOnInit() {
  }
  async onSubmit() {
    if (this.formData.IDCARD) {
      if (this.formData.IDCARD.length == 13) {
        await this.callapi.setData(this.formData.IDCARD);
        this.index = 1;
      } else {
        notify('กรุณากรอกให้ครบ', 'error', 2000);
      }
    }
    // this.router.navigate([this.formData.IDCARD+'/guest/']);
  }
  async OnBack() {
    location.reload();
  }
}

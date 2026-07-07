import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallApiService } from './../../shared/services/call-api.service';
import { InternalCache } from './../../shared/services/cache';

@Component({
  selector: 'app-com-history-detail',
  templateUrl: './com-history-detail.component.html',
  styleUrls: ['./com-history-detail.component.scss']
})
export class ComHistoryDetailComponent implements OnInit {
_formdata: any = [];
  _selectUser: any = [];
  hasPic = false;
  data:any=[];
  constructor(private router:Router,private callapi:CallApiService) { }

  async ngOnInit() {

    if(this._formdata){
      this._formdata = this.callapi.getData();
    }
    if (this.callapi.getData() == "") {
      this.router.navigate(['/History'])
    }
    if(typeof this._formdata.COM_EVIDENCE !== 'object')
    {
      this.hasPic = true
    }
    this.data = await this.callapi.getAllUsers().toPromise();
    this._selectUser = this.data.body;
  }
  OnBack(){
    this.router.navigate(['/History']);
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

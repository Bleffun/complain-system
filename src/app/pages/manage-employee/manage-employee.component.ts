import { Component } from '@angular/core';
import { CallApiService } from '../../shared/services/call-api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.scss'
})
export class ManageEmployeeComponent {
  constructor(private callapi: CallApiService, private router: Router) { }
  RoleList: any = [];
  RoleList2: any = [];
  async ngOnInit() {
    this.RoleList = await this.callapi.getAllUsers().toPromise();
    this.RoleList2 = this.ConvertDate(this.RoleList.body);
  }
  OnEdit(e: any) {
    this.callapi.setData(e);
    this.router.navigate(['/ComplainList/' + e.COM_ID]);
  }
  OnDelete(e:any){
    console.log('event',e);
  }
  ConvertDate(date: any) {
    const Newdate = date.map((item: any) => {
      const dateObj = new Date(item.CREATE_DATE);
      const day = String(dateObj.getDate()).padStart(2, '0');
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
      const thaiYear = dateObj.getFullYear() + 543;
      if (item.CREATE_DATE) {
        return {
          ...item,
          CREATE_DATE: `${day}/${month}/${thaiYear} ${hours}:${minutes}`
        };
      }else{
        return{
          ...item,
          CREATE_DATE: '-'
        }
      }
    });
    return Newdate;
  }
}

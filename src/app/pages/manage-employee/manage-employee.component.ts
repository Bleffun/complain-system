import { Component } from '@angular/core';
import { CallApiService } from '../../shared/services/call-api.service';
import { Router } from '@angular/router';
import { Confirm, Success } from '../../common/helper';
import { InternalCache } from '../../shared/services/cache';


@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrl: './manage-employee.component.scss'
})
export class ManageEmployeeComponent {
  constructor(private callapi: CallApiService, private router: Router) { }
  UserList: any = [];
  UserList2: any = [];
  async ngOnInit() {
    this.UserList = await this.callapi.getSomeUser(InternalCache.Get('roleId')).toPromise();
    this.UserList2 = this.ConvertDate(this.UserList.body);
  }
  OnEdit(e: any) {
    this.callapi.setData(e);
    this.router.navigate(['/ManageEmployee/' + e.USER_ID]);
  }
  async OnDelete(e: any) {
    const DeleteAlert = await Confirm('ยืนยันการลบผู้ใช้', '')
    if (!DeleteAlert) {
      return;
    }
    const DeletedUser = {
      USER_DELETED: true
    }
    await this.callapi.DeleteUser(e.USER_ID, DeletedUser).toPromise();
    await Success('ลบข้อมูลเสร็จสิ้น','');
    location.reload();
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
      } else {
        return {
          ...item,
          CREATE_DATE: '-'
        }
      }
    });
    return Newdate;
  }
}

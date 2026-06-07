import { Component, OnInit } from '@angular/core';
import { CallApiService } from '../../shared/services/CallApi.service';

@Component({
  selector: 'app-Task-list',
  templateUrl: './Task-list.component.html',
  styleUrls: ['./Task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  _myTaskList: any = [];
  _isLoading = false;
  sesUID: any;
  constructor(private CallApi: CallApiService) { }

  async ngOnInit() {
    this.sesUID = sessionStorage.getItem('userID');
    this._myTaskList = await this.CallApi.getTask(this.sesUID).toPromise();
    this._myTaskList = this._myTaskList.map((item: any) => {
      return {
        ...item,
        DATETH: this.convertToThaiYear(item.CREATE_DATE)
      };
    });
    console.log(this._myTaskList);
  }
  Edit(e: any) {

  }

  convertToThaiYear(dateString: any): string {
    if (!dateString) return '-';

    const date = new Date(dateString);

    // ตรวจสอบว่า Date object ถูกต้องหรือไม่
    if (isNaN(date.getTime())) return '-';

    // ดึง วัน และ เดือน (เติม 0 ข้างหน้าถ้ามีหลักเดียว)
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // มกราคมคือ 0 จึงต้อง +1

    // แปลงปี ค.ศ. เป็น พ.ศ. โดยการบวก 543
    const yearThai = date.getFullYear() + 543;

    // ส่งค่ากลับไปในฟอร์แมต วัน/เดือน/พ.ศ. (dd/MM/yyyy)
    return `${day}/${month}/${yearThai}`;
  }
}

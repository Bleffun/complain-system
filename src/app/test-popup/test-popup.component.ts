import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { CallApiService } from '../shared/services/call-api.service';

// or via CommonJS

@Component({
  selector: 'app-test-popup',
  templateUrl: './test-popup.component.html',
  styleUrls: ['./test-popup.component.scss']
})
export class TestPopupComponent implements OnInit {

  popupVisibleEdit = false;
  popupVisibleadd = false;
  stddata = {} as any;
  searchstddata = {} as any;
  searchstddata2 = {} as any;
  searchstddata3 = {} as any;
  adddatastd = {} as any;
  constructor(private http: HttpClient,private TestApi:CallApiService) { }


  ngOnInit() {
    this.readdata();
    this.TestApi.getUser('1').subscribe(_ => console.log(_)
    );
    // this.http.get("http://localhost:52689/").subscribe();
  }
  readdata() {
    this.http.get('https://bma-oss.demotoday.net/benew/api/Tbstudent').subscribe(response => {
      this.stddata = response;
      this.stddata = this.stddata.Value;
    })
  }
  editdata() {
    this.popupVisibleEdit = false;
    Swal.fire({
      title: "แก้ไขข้อมูลเป็น",
      html: "<center><table style=' text-align:left;'><tr ><td style='width:90px;'>รหัสนักเรียน</td><td style='width:220px;'>: " + this.searchstddata3.STD_ID + "</td></tr><tr><td align=left>ชื่อ</td><td >: " + this.searchstddata3.STD_FNAME + "</td></tr><tr><td>นามสกุล</td><td>: "+ this.searchstddata3.STD_LNAME +"</td></tr></table></center>",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน"

    }).then((result) => {

      if (result.isConfirmed) {
        Swal.fire({
          title: "แก้ไขเรียบร้อย",
          text: "แก้ไขข้อมูลเรียบร้อย",
          icon: "success"
        });
        this.http.put('https://bma-oss.demotoday.net/benew/api/Tbstudent', {
          "main": {
            "STD_ID": this.searchstddata3.STD_ID,
            "STD_FNAME": this.searchstddata3.STD_FNAME,
            "STD_LNAME": this.searchstddata3.STD_LNAME,
            "RECORD_STATUS": this.searchstddata3.RECORD_STATUS,
            "DEL_FLAG": "N",
            "CREATE_DATE": "2024-03-29T00:00:00",
            "UPDATE_DATE": "0001-01-01T00:00:00"
          },
          "detail": [
            {
              "STUDENT_COURSE_ID": 1,
              "STUDENT_ID": 7,
              "COURSE_REMARK": "",
              "COURSE_TOTAL": 7.889,
              "DEL_FLAG": "N",
              "RECORD_STATUS": "A",
              "CREATE_DATE": "2024-03-29T00:00:00",
              "UPDATE_DATE": "0001-01-01T00:00:00",
              "COURSE_NAME": "THAI"
            },
            {

              "COURSE_REMARK": "",
              "COURSE_TOTAL": 7.889,
              "COURSE_NAME": "THAI"
            }
          ]
        }).subscribe(response => {
          this.readdata();
        })
      }
    });


  }
  searchstd(e: any) {
    this.popupVisibleEdit = true;
    this.http.get('https://bma-oss.demotoday.net/benew/api/Tbstudent/' + e.data.STD_ID).subscribe(response => {
      this.searchstddata = response;
      this.searchstddata2 = this.searchstddata.Value;
      this.searchstddata3 = this.searchstddata2.main;
      // console.log('e',e.data.STD_ID,'s',this.searchstddata);

      console.log(this.searchstddata2.main);
    })

  }
  deletestd(e: any) {
    Swal.fire({
      title: "ต้องการจะลบจริงหรือไม่",
      text: "ไม่สามารถย้อนกลับได้",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่ ฉันต้องการลบ"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "ลบเรียบร้อย!",
          text: "ข้อมูลถูกลบ",
          icon: "success"
        });
      }
      this.http.delete('https://bma-oss.demotoday.net/benew/api/Tbstudent/' + e.data.STD_ID).subscribe(response => {
        this.readdata();
      })
    });

  }
  addstd() {
    this.http.post('https://bma-oss.demotoday.net/benew/api/Tbstudent/', {
      "main": {
        "STD_FNAME": this.adddatastd.STD_FNAME,
        "STD_LNAME": this.adddatastd.STD_LNAME,
      },
      "detail": [
        {
          "COURSE_TOTAL": 7.8888,
          "COURSE_NAME": "THAI"
        }
      ]
    }).subscribe(response => {
      this.readdata();
      this.popupVisibleadd = false;
    });
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "เพิ่มข้อมูลเรียบร้อย",
      showConfirmButton: false,
      timer: 1500
    });
  }

}

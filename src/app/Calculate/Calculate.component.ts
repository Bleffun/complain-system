
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Calculate',
  templateUrl: './Calculate.component.html',
  styleUrls: ['./Calculate.component.css']

})
export class CalculateComponent implements OnInit {

  constructor() { }
  textout="คำนวณค่าภาษีเงินได้ 5 %";
  ngOnInit() {

  }
  taxcalculate(tax:string){
    const price = Number(tax);
    this.textout= this.textout+" ได้ : "+ price*0.05;
  }

}

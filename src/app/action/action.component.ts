import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrl: './action.component.css'
})
export class ActionComponent {
  @Input() changeinput:boolean = true;
  @Input() value:number = 0;
  @Input() step:number =1;
  @Output() valueChange = new EventEmitter
  increase(){
    if(this.value + this.step <= 100){
    this.value= this.value+this.step;
    this.valueChange.emit(this.value);
    }
  }
  decrease(){
    if(this.value - this.step >= 0){
    this.value= this.value-this.step;
    this.valueChange.emit(this.value);
    }
  }

}

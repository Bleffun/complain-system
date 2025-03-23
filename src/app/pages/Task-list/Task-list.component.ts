import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-Task-list',
  templateUrl: './Task-list.component.html',
  styleUrls: ['./Task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  _myTaskList = [];
  _isLoading = false;
  constructor() { }

  ngOnInit() {

  }
  Edit(e:any){

  }

}

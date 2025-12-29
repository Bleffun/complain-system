import { Component, OnInit } from '@angular/core';
import { CallApiService } from '../../shared/services/CallApi.service';

@Component({
  selector: 'app-Task-list',
  templateUrl: './Task-list.component.html',
  styleUrls: ['./Task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  _myTaskList:any = [];
  _isLoading = false;
  sesUID :any;
  constructor(private CallApi: CallApiService) { }

  async ngOnInit() {
    this.sesUID = sessionStorage.getItem('userID');
    this._myTaskList = await this.CallApi.getTask(this.sesUID).toPromise();
  }
  Edit(e:any){

  }

}

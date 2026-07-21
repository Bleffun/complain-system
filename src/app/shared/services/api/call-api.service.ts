import { Injectable } from '@angular/core';
import { req } from '../request-api.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {
  data: any = [];
  logged: any;
  apiUrl = "https://localhost:44313/api/";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) { }
  public setData(data: any) {
    this.data = data;
  }
  public getData() {
    return this.data;
  }

  public getUser(id: any): Observable<any[]> {
    return req<any[]>('CallApi/' + id + '/CheckUser')
      .get();
  }
  public getAllUsers(): Observable<any[]> {
    return req<any[]>('CallApi/User')
      .get();
  }
  public getComplain(ROLE_ID: string): Observable<any[]> {
    return req<any[]>('CallApi/' + ROLE_ID + '/complain')
      .get();
  }
  public getHistory(ROLE_ID: string): Observable<any[]> {
    return req<any[]>('CallApi/' + ROLE_ID + '/History')
      .get();
  }
  // public addComp(body: any): Observable<any[]> {
  //   return req<any>('CallApi/AddComplain')
  //     .body(body)
  //     .post();
  // }
  public addComp(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "CallApi/AddComplain", data, { headers: this.headers });
  }
  public addRole(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "CallApi/AddRole", data, { headers: this.headers });
  }
  public addEmp(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "CallApi/AddEmployee", data, { headers: this.headers });
  }
  // public changeStatus(id:number,data:any):Observable<any>{
  //   return req<any[]>("CallApi/"+id+"/Status")
  //   .body(data)
  //   .put();
  // }
  public changeStatus(id: number, data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "CallApi/" + id + "/Status", data, { headers: this.headers });
  }
  public changeStatus2(id: number, data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "CallApi/" + id + "/Status2", data, { headers: this.headers });
  }
  public getRole(role_id: number): Observable<any[]> {
    return req<any[]>('CallApi/' + role_id + '/ROLE')
      .get();
  }
  public getAllusername(): Observable<any[]> {
    return req<any[]>('CallApi/AllUser')
      .get();
  }
  public getSomeUser(id:number): Observable<any[]> {
    return req<any[]>('CallApi/'+ id +'/User')
      .get();
  }
  public DeleteUser(id: number, data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "CallApi/" + id + "/DeleteUser", data, { headers: this.headers });
  }
  public EditUser(id: number, data: any): Observable<any> {
    return this.http.put<any>(this.apiUrl + "CallApi/" + id + "/EditUser", data, { headers: this.headers });
  }
}


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CallApiService {

constructor(private http:HttpClient) { }

  urlapi = "https://localhost:44313/api/CallApi/";
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  public getUser(username:any){
    return this.http.get<any[]>(this.urlapi+username+"/CheckUser");
  }
  public addComplain(data:any){
    return this.http.post<any[]>(this.urlapi,data,{ headers: this.headers });
  }
}

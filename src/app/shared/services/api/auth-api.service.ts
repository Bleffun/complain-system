import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
apiUrl = "https://localhost:44313/api/Auth";
private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
constructor(private http: HttpClient) { }
public Login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/Login", data, { headers: this.headers });
  }

}

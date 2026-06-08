import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from '../../app.component';

@Injectable({
  providedIn: 'root'
})
class RequestApiService<T> implements IRequest<T> {
  _url: any;
  _method: any;
  _body:any =[];
  constructor(private http: HttpClient) {

  }
  public api(url: string): IRequest<T> {
    this._url = url;
    return this;
  }
  public body(body: { [b: string]: any; }): IRequest<T> {
    this._body = body;
    return this;
  }
  public result<TResult>(): IRequest<TResult> {
    return this as unknown as IRequest<TResult>;
  }
  public post(): Observable<T> {
    this._method = "POST"
    return this.send();
  }
  public get(): Observable<T> {
    this._method = "GET"
    return this.send();
  }
  public put(): Observable<T> {
    this._method = "PUT"
    return this.send();
  }
  private send(): Observable<T> {
    const urlWithbase = "https://localhost:44313/api/" + this._url;
    const request: Request = new Request(this._method, urlWithbase,)
    return this.http.request(request) as any;
  }
}
interface HttpStatusResult {
  Message: string;
  StatusCode: number;
  IsSuccess: boolean;
}
export class Request extends HttpRequest<HttpStatusResult> {
  override clone(update?: {
    method?: string;
    body?: any;
    url?: string;
  }): Request {
    const method = update?.method || this.method;
    const url = update?.url || this.url;
    const body = update?.body || this.body;
    const requset = new Request(
      method, url, body
    )
    return requset;
  }
}

interface IRequest<T> {
  result<TRseult>(): IRequest<TRseult>;
  body(body: { [b: string]: any | string[] }): IRequest<T>;
  post(): Observable<T>;
  get(): Observable<T>;
  put(): Observable<T>;
}

export function req<T>(api?: any): IRequest<T> {
  return new RequestApiService(
    AppComponent.Injector.get(HttpClient)
  )
    .api(api)
    .result<T>();
}

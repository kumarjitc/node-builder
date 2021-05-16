import { environment } from './../../../environments/environment';
import { IHttpServiceParams, IHttpOptions } from './../commons/structures';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class HttpService<T> {

  constructor(public http: HttpClient) { }

  public doGet(params: IHttpServiceParams<T>): Promise<any> {
    let options: IHttpOptions = {
      params: new HttpParams({
        fromObject: params.queryString || {}
      })
    }

    return this.http.get(environment.BASE_URL + params.url,
      options).toPromise();
  }

  public doPost(params: IHttpServiceParams<T>): Promise<any> {
    let options: IHttpOptions = {
      params: new HttpParams({
        fromObject: params.queryString || {}
      })
    }

    return this.http.post(environment.BASE_URL + params.url,
      params.formData,
      options).toPromise();
  }

  public doPut(params: IHttpServiceParams<T>): Promise<any> {
    let options: IHttpOptions = {
      params: new HttpParams({
        fromObject: params.queryString || {}
      })
    }

    return this.http.put(environment.BASE_URL + params.url,
      params.formData,
      options).toPromise();
  }

  public doDelete(params: IHttpServiceParams<T>): Promise<any> {
    let options: IHttpOptions = {
      params: new HttpParams({
        fromObject: params.queryString || {}
      })
    }

    return this.http.delete(environment.BASE_URL + params.url,
      options).toPromise();
  }
}

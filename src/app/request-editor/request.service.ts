import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class RequestService {

  constructor(
    private _http: HttpClient
  ) { }

  /**
   * Make a post request
   * @param {string} url
   * @param body
   * @returns {Observable<any>}
   */
  post(url: string, body: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return this._http.post<any>(url, body, httpOptions);
  }

}

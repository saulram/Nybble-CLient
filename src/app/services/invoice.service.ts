import { Injectable } from '@angular/core';
import { Invoice } from '../models/invoice.model';
import { GLOBAL } from './global';
import { map } from "rxjs/operators";

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { jsonpFactory } from '@angular/http/src/http_module';
@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  public url: string;
  public apikey: string;

  constructor(private _http: Http) {
    this.url = GLOBAL.url;
    this.apikey = GLOBAL.apikey;
  }

  addInvoice(invoice: Invoice) {
    let params = JSON.stringify(invoice);
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',

    });
    return this._http.post(this.url + 'invoice/save', params, { headers: headers }).pipe(map(res => res.json()));

  }


  getInvoices() {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',

    })
    return this._http.get(this.url + 'invoice/getall', { headers }).pipe(map(res => res.json()));
  }

  deleteInvoice(id: string) {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin':'*',


    });
    let options = new RequestOptions({ headers: headers });
    return this._http.delete(this.url + 'invoice/delete/' + id, options).pipe(
      map(res => res.json())
    );

  }

  getForecast(lat: number, lon: number) {
    let headers = new Headers({
      'Content-Type': 'application/json',

    'Access-Control-Allow-Origin':'*',


    });

    return this._http.get('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&APPID=' + this.apikey+'&units=metric', { headers }).pipe(map(res => res.json()));

  }

}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { Trailer } from '../shared/trailer';
import { FormGroup } from '@angular/forms';
import { TrailerType } from '../shared/trailertype';
import { Inspection } from '../shared/trailerInspection';
@Injectable({
  providedIn: 'root'
})
export class RentalReportService {
  apiUrl='https://inf370database20231001133617.azurewebsites.net/api/'

  httpOptions={
    headers:new HttpHeaders({
      ContentType:'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  getRevenueReport(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Report/GetRevenueReport`)
    .pipe(map(result=> result))
  }

  downloadReport(selection:any, type: any){
    return this.httpClient.get(`${this.apiUrl}Report/DownloadReport/${selection}`, type);
  }
}

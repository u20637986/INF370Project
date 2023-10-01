import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalReportService {

  apiUrl = 'https://inf370database20231001133617.azurewebsites.net/api/'


  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {
  }


  public getRentalPayments():Observable<any>{
   return this.httpClient.get(`${this.apiUrl}Report/GetAllPayments`)
   .pipe(map(result => result));
  }

  public getRentalApplications():Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Report/GetAllRentals`)
    .pipe(map(result => result));
  }


  public getTrailers():Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Report/GetAllTrailers`)
    .pipe(map(result => result));
  }

  public getVehicles():Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Report/GetAllVehicles`)
    .pipe(map(result => result));
  }

  //GetTrailerTypes

  public getTrailerTypes():Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Report/GetTrailerTypes`)
    .pipe(map(result => result));
  }

  //GetAllVehicleTypes
  public getVehicleTypes():Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Report/GetAllVehicleTypes`)
    .pipe(map(result => result));
  }
}
import { Passenger } from '../shared/passenger';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'https://inf370database20231001133617.azurewebsites.net/api/'


  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {
  }
   //Passenger
  GetAllPassengers(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Passenger/ViewPassenger`)
    .pipe(map(result => result));
  }
  getPassenger(passengerID: number):Observable<any> {
    return this.httpClient.get<Passenger>(`${this.apiUrl}Passenger/GetPassenger/${passengerID}`)
    .pipe(map(result => result))
  }

 AddPassenger(passenger:any) :Observable<any>{

    return this.httpClient.post<Passenger>(this.apiUrl+`Passenger/AddPassenger`,passenger);
  }

  UpdatePassenger(passenger:Passenger, passengerID:Number): Observable<any>{
    return this.httpClient.put<Passenger>(`${this.apiUrl}Passenger/UpdatePassenger/${passengerID}`, passenger);
  }

  DeletePassenger(passengerID:Number):Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}Passenger/DeletePassenger/${passengerID}`);
  }
}

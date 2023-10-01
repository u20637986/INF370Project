import { Passenger } from '../shared/passenger';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, switchMap, from} from 'rxjs';
import { Trailer } from '../shared/trailer';
import { Rental } from '../shared/rental';
import { Vehicle } from '../shared/vehicle';
import { VehicleStatus } from '../shared/VehicleStatus';
import { VehicleType } from '../shared/VehicleType';
import { VehiclePrice } from '../shared/vehiclePrice';
//import {env}


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

  constructor(private HttpClient:HttpClient){}

    CreateRentalApplication(file:FormData){
        return this.HttpClient.post(`${this.apiUrl}RentalApplication/RentTrailer`, file)
    }
    
    CreateVehicleRentalApplication(file:FormData){
      return this.HttpClient.post(`${this.apiUrl}RentalApplication/RentVehicle`, file)
  }

    GetAllRentalApplications(): Observable<any>{
      return this.HttpClient.get(`${this.apiUrl}RentalApplication/ViewApplications`)
      .pipe(map(result => result));
    }
    GetAllTrailers(): Observable<any>{
      return this.HttpClient.get(`${this.apiUrl}Trailer/GetAllTrailers`)
      .pipe(map(result => result));
    }

   
    getTrailer(trailerID: number):Observable<any> {
      return this.HttpClient.get<Trailer>(`${this.apiUrl}Trailer/GetTrailer/${trailerID}`)
      .pipe(map(result => result))
    }
    //Vehicle
    getVehicles(): Observable<any>{
      return this.HttpClient.get(`${this.apiUrl}Vehicle/GetAllVehicles`)
        .pipe(map(result => result))
    }

      getVehicle(VehicleID: number) {
        return this.HttpClient.get(`${this.apiUrl}Vehicle/GetVehicle` + "/" + VehicleID)
        .pipe(map(result => result))
      }


      getVehicleStatus(): Observable<VehicleStatus[]> {
        return this.HttpClient.get<VehicleStatus[]>(`${this.apiUrl}Vehicle/GetAllVehicleStatus`);
      }

      getVehicleTypes(): Observable<VehicleType[]> {
        return this.HttpClient.get<VehicleType[]>(`${this.apiUrl}Vehicle/GetAllVehicleTypes`);
      }

      getVehiclePrices(vehiclePriceID:number): Observable<VehiclePrice> {
        return this.HttpClient.get<VehiclePrice>(`${this.apiUrl}Vehicle/GetVehiclePrice/${vehiclePriceID}`)
      }


    GetRentalStatuses(): Observable<any>{
      return this.HttpClient.get(`${this.apiUrl}RentalApplication/RentalStatuses`)
      .pipe(map(result => result));
    }
    getRentalApplication(rentalID: number):Observable<any> {
      return this.HttpClient.get<Rental>(`${this.apiUrl}RentalApplication/ViewRentalApplication/${rentalID}`)
      .pipe(map(result => result))
    }


    cancelRentalApplication(rentalID: number):Observable<any> {
      return this.HttpClient.delete<Rental>(`${this.apiUrl}RentalApplication/CancelRentalApplication/${rentalID}`)
      .pipe(map(result => result))
    }


    updateRentalApplication(rentalID: number, rental: Rental): Observable<any> {
      
      return this.HttpClient.put<Rental>(`${this.apiUrl}RentalApplication/UpdateRentalApplication/${rentalID}`, rental);
    }

    payRentalApplication(rentalID: number, amount: number): Observable<any> {
      return this.HttpClient.post(`${this.apiUrl}RentalApplication/PayRentalApplication/${rentalID}?amount=${amount}`, null);
    }
   
}

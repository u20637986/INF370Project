import { Passenger } from '../shared/passenger';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject, switchMap, from, throwError} from 'rxjs';
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

  userID = localStorage.getItem('userID');

  GetUsersRentalApplications(): Observable<any>{
    return this.HttpClient.get(`${this.apiUrl}RentalApplication/ViewApplications/${this.userID}`)
    .pipe(map(result => result));
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
      GetUsers(): Observable<any>{
        return this.HttpClient.get(`${this.apiUrl}RentalApplication/Users`)
        .pipe(map(result => result));
      }
      /*ReviewRentalApplication(rentalId: number, approve: boolean, reason: string): Observable<any> {
        const url = `${this.apiUrl}RentalApplication/ReviewApplication/${rentalId}?approve=${approve}&reason=${encodeURIComponent(reason)}`;
        return this.HttpClient.post(url, null);
      }*/

      ReviewRentalApplication(rentalId: number, approve: boolean, reason: string): Observable<any> {
        
        const userId = localStorage.getItem('userID');
      
        if (!userId) {
          console.error("UserID not found in localStorage");
          return throwError("UserID not found in localStorage");
        }
      
        const encodedReason = encodeURIComponent(reason);
        const encodedUserId = encodeURIComponent(userId);
        const url = `${this.apiUrl}RentalApplication/ReviewApplication/${rentalId}?approve=${approve}&reason=${encodedReason}&userId=${encodedUserId}`;
      
        return this.HttpClient.post(url, null);
      }
      
      sendCollectionDetails(rentalId: number): Observable<any> {
        const userId = localStorage.getItem('userID');
      
        if (!userId) {
          console.error("UserID not found in localStorage");
          return throwError("UserID not found in localStorage");
        }
        const encodedUserId = encodeURIComponent(userId);
       return this.HttpClient.get(`${this.apiUrl}RentalApplication/SendCollectionDetails?rentalId=${rentalId}&userId=${encodedUserId}`);
      }

      getRentalReport(startDate: string, endDate: string): Observable<any> {
        const userId = localStorage.getItem('userID');
      
        if (!userId) {
          console.error("UserID not found in localStorage");
          return throwError("UserID not found in localStorage");
        }
        const encodedUserId = encodeURIComponent(userId);
        return this.HttpClient.get(`${this.apiUrl}RentalApplication/GenerateRentalReport?startDate=${startDate}&endDate=${endDate}&userId=${encodedUserId}`);
      }
    GetRentalStatuses(): Observable<any>{
      return this.HttpClient.get(`${this.apiUrl}RentalApplication/RentalStatuses`)
      .pipe(map(result => result));
    }
    getRentalApplication(rentalID: number):Observable<any> {
      return this.HttpClient.get<Rental>(`${this.apiUrl}RentalApplication/ViewRentalApplication/${rentalID}`)
      .pipe(map(result => result))
    }
    getUser(userID: number): Observable <any>{
      return this.HttpClient.get<any>(`${this.apiUrl}RentalApplication/User/${userID}`)
    }

    cancelRentalApplication(rentalID: number):Observable<any> {
      return this.HttpClient.delete<Rental>(`${this.apiUrl}RentalApplication/CancelRentalApplication/${rentalID}`)
      .pipe(map(result => result))
    }

    payRentalApplication(rentalID: number, amount: number): Observable<any> {
      return this.HttpClient.post(`${this.apiUrl}RentalApplication/PayRentalApplication/${rentalID}?amount=${amount}`, null);
    }
    checkVehicleRentalOverlap(vehicleId: number, startDate: string, endDate: string) {
      const payload = { vehicleId, startDate, endDate };
      return this.HttpClient.post<boolean>(`${this.apiUrl}RentalApplication/CheckVehicleRentalOverlap`, payload);
    }
    checkTrailerRentalOverlap(trailerId: number, startDate: string, endDate: string) {
      const payload = { trailerId, startDate, endDate };
      return this.HttpClient.post<boolean>(`${this.apiUrl}RentalApplication/CheckTrailerRentalOverlap`, payload);
    }
    GetUnavilableDatesPerTrailer(trailerId: number): Observable<any>{
      return this.HttpClient.get(`${this.apiUrl}RentalApplication/GetUnavailableDatesPerTrailer/${trailerId}`)
      .pipe(map(result => result));
    }
    GetUnavilableDatesPerVehicle(vehicleId: number): Observable<any>{
      return this.HttpClient.get(`${this.apiUrl}RentalApplication/GetUnavailableDatesPerVehicle/${vehicleId}`)
      .pipe(map(result => result));
    }
   GetAuditLogs() :Observable<any>
   {
     return this.HttpClient.get(`${this.apiUrl}AuditLog/GetAuditLogs`)
   }
}
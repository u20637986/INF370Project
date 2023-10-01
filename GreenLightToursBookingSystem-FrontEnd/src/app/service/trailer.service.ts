import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject , throwError} from 'rxjs';
import { Trailer } from '../shared/trailer';
import { FormGroup } from '@angular/forms';
import { TrailerType } from '../shared/trailertype';
import { Inspection } from '../shared/trailerInspection';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl='https://inf370database20231001133617.azurewebsites.net/api/'

  httpOptions={
    headers:new HttpHeaders({
      ContentType:'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getTrailer(trailerId:number)
  {
    return this.httpClient.get<Trailer>(`${this.apiUrl}Trailer/GetTrailer/${trailerId}`)
    .pipe(map(result=> result))
  }


  getTrailers(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Trailer/GetAllTrailers`)
    .pipe(map(result=> result))
  }

  addTrailer(trailer:any):Observable<any>
  {  
    const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
 
  
  const encodedUserId = encodeURIComponent(userId);
    
    return this.httpClient.post<any>(`${this.apiUrl}Trailer/AddTrailer?userId=${encodedUserId}`, trailer)
  }

 /* updateTrailer(trailerId: Number, trailer:any)
  {
    return this.httpClient.put(`${this.apiUrl}Trailer/EditTrailer/${trailerId}`, trailer, this.httpOptions);
  }*/

  updateTrailer(trailerID: number,trailer:any){
    const userId = localStorage.getItem('userID');
      
    if (!userId) {
      console.error("UserID not found in localStorage");
      return throwError("UserID not found in localStorage");
    }
   
    
    const encodedUserId = encodeURIComponent(userId);

    return this.httpClient.put<Trailer>(`${this.apiUrl}Trailer/EditTrailer/${trailerID}?userId=${encodedUserId}`, trailer, this.httpOptions);

  }

  deleteTrailer(trailerId: Number)
  {
    const userId = localStorage.getItem('userID');
      
    if (!userId) {
      console.error("UserID not found in localStorage");
      return throwError("UserID not found in localStorage");
    }
   
    
    const encodedUserId = encodeURIComponent(userId);
    return this.httpClient.delete<string>(`${this.apiUrl}Trailer/DeleteTrailer`+ "/"+ trailerId + "?userId" + encodedUserId)
  }

  getImages(): Observable<any>
  {
    return this.httpClient.get(`${this.apiUrl}Trailer/Images`)
    .pipe(map(result => result))
  }

  getRentalPrices(): Observable<any>
  {
    return this.httpClient.get(`${this.apiUrl}Trailer/RentalPrices`)
    .pipe(map(result => result))
  }


  getTrailerStatuses(): Observable<any>
  {
    return this.httpClient.get(`${this.apiUrl}Trailer/TrailerStatuses`)
    .pipe(map(result => result))
  }


  getTrailerType(trailerTypeId: number)
  {
   
    return this.httpClient.get(`${this.apiUrl}Trailer/GetTrailerType` + "/" + trailerTypeId)
    .pipe(map(result => result))
  }

  getTrailerTypes(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Trailer/GetTrailerTypes`)
    .pipe(map(result => result))
  }

  addTrailerType(trailerType: TrailerType)
  {
    const userId = localStorage.getItem('userID');
      
    if (!userId) {
      console.error("UserID not found in localStorage");
      return throwError("UserID not found in localStorage");
    }
    const encodedUserId = encodeURIComponent(userId);
    return this.httpClient.post(`${this.apiUrl}Trailer/AddTrailerType?userId=${encodedUserId}`, trailerType, this.httpOptions)
  }

  deleteTrailerType(trailerTypeId: number)
  {
    const userId = localStorage.getItem('userID');
      
    if (!userId) {
      console.error("UserID not found in localStorage");
      return throwError("UserID not found in localStorage");
    }
    const encodedUserId = encodeURIComponent(userId);
    return this.httpClient.delete<string>(`${this.apiUrl}Trailer/DeleteTrailerType` + "/" + trailerTypeId + "?userId=" + encodedUserId, this.httpOptions)
  }

  editTrailerType(trailerTypeId: number, trailerType: TrailerType)
  {
    const userId = localStorage.getItem('userID');
      
    if (!userId) {
      console.error("UserID not found in localStorage");
      return throwError("UserID not found in localStorage");
    }
    const encodedUserId = encodeURIComponent(userId);
    return this.httpClient.put(`${this.apiUrl}Trailer/EditTrailerType/${trailerTypeId}?userId=${encodedUserId}`,trailerType, this.httpOptions)
  }


  getInspections():Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Trailer/GetAllInspections`).pipe(map(result=>result));
  }

  addInspection(trailerID:number,inspection:any):Observable<any>{
    const userId = localStorage.getItem('userID');
      
    if (!userId) {
      console.error("UserID not found in localStorage");
      return throwError("UserID not found in localStorage");
    }
    const encodedUserId = encodeURIComponent(userId);
    return this.httpClient.post<Inspection>(`${this.apiUrl}Trailer/AddTrailerInspection/${trailerID}?userId=${encodedUserId}`, inspection)
  }

  getEmployee(employeeID:number){
    
    return this.httpClient.get(`${this.apiUrl}Admin/GetEmployee` + "/" +employeeID)
    .pipe(map(result=>result))

}

getUser(userID:number)
{
  return this.httpClient.get(`${this.apiUrl}User/GetUser` + "/" +userID)
  .pipe(map(result=>result))
 
}

hasActiveRentalApplicationsForTrailer(trailerId: number) {
  const url = `${this.apiUrl}Trailer/HasActiveRentalApplicationsForTrailer/${trailerId}`;
  
  // Send a GET request to the backend API
  return this.httpClient.get<boolean>(url);
}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../shared/resetPassword';

@Injectable({
  providedIn: 'root'
})
export class ResetService {

  private apiUrl: string = 'https://inf370database20231001133617.azurewebsites.net/api/User/'

  constructor(private http: HttpClient) { }

  sendLink(email: string){
    return this.http.post<any>(`${this.apiUrl}send-email/${email}`, {})
  }

  resetPassword(resetObj: ResetPassword){
    return this.http.post<any>(`${this.apiUrl}reset-password`, resetObj);
  }
}

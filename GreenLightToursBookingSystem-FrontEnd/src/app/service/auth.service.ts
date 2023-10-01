import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://inf370database20231001133617.azurewebsites.net/api/'
  private userPayload:any;

  constructor(private http: HttpClient, private route: Router) {
    
   }

  /*register(registerObj:any){
    return this.http.post<any>(`${this.apiUrl}User/Register`, registerObj)
  }*/
  register(registerObj:any){
    return this.http.post<User>(`${this.apiUrl}User/Register`, registerObj)
  }

  login(loginObj:any){
    return this.http.post<User>(`${this.apiUrl}User/Login`, loginObj)
  }

  AdminRegister(registerObj:any){
    return this.http.post<User>(`${this.apiUrl}Employees/Register`, registerObj)
  }

  AdminLogin(loginObj:any){
    return this.http.post<any>(`${this.apiUrl}Employees/Login`, loginObj)
  }

  verify2FAToken(userEmail:string, twoFactorToken:string): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}User/Verify2FAToken`, {userEmail, twoFactorToken})
  }

  
  logout(){
    localStorage.clear();
    this.route.navigate(['login'])
  }

  token(storeToken:string){
    localStorage.setItem('accessToken', storeToken)
  }

  getToken(){
    return localStorage.getItem('accessToken')
  }

  user(role:string){
    localStorage.setItem('role', role)
  }

  getUser(){
    return localStorage.getItem('role')
  }

  isLoggedIn(): boolean{
    return localStorage.getItem('accessToken')!=null;
  }

  userID(storeID:any){
    localStorage.setItem('userID', storeID)
  }

  getEmail(storeEmail:string)
  { 
    localStorage.setItem('email', storeEmail)
  }

  getUserID(){
    return localStorage.getItem('userID')
  }

}

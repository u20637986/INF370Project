import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = 'https://localhost:7162/api/'
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

  /*AdminLogin(loginObj: any) {
    return this.http.post<any>(`${this.apiUrl}Employees/Login`, loginObj).pipe(
      // Assuming the server response contains a 'role' property indicating the user's role (e.g., 'user' or 'employee')
      map((response) => {
        if (response && response.role === 'Admin') {
          // Set user role in local storage or any other state management mechanism
          localStorage.setItem('userRole', 'Admin');
        } else {
          localStorage.setItem('userRole', 'Admin');
        }
        return response;
      })
    );
  }*/
  
  

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

}

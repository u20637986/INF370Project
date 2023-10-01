/*import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeGuard implements CanActivate {

  constructor(private authService:AuthService, private route:Router){}

  canActivate(): boolean {
    if(this.authService.isLoggedIn()){
      return true;
    } else {
      this.route.navigate(['admin-login'])
      return false;
    }
  }
  
}*/

//import { Injectable } from '@angular/core';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class EmployeeGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const userRole = localStorage.getItem('role');

    if (userRole === 'Admin') {
      return true;
    } else {
      this.router.navigate(['/admin-login']);
      return false;
    }
  }
}


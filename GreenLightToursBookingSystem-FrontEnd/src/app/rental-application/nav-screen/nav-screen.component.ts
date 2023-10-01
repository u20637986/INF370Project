import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-nav-screen',
  templateUrl: './nav-screen.component.html',
  styleUrls: ['./nav-screen.component.scss']
})
export class NavScreenComponent {

  constructor(private router:Router){}

  CreateRentalApplication(){
    this.router.navigate(['/rentalProducts'])
  }
  ViewRentalApplication(){
    this.router.navigate(['/rental-applications'])
  }
}

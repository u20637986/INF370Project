import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent {

  constructor(private router: Router) { }
  
  redirectToMakeBooking(): void {
    window.location.href="./booking-controller";
  
  }


}

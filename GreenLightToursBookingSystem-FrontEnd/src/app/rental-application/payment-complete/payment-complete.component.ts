import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/rentalDataService';

@Component({
  selector: 'app-payment-complete',
  templateUrl: './payment-complete.component.html',
  styleUrls: ['./payment-complete.component.scss']
})
export class PaymentCompleteComponent implements OnInit {
  
  rental:any;

  constructor(private dataService: DataService, private router:Router){}

  ngOnInit(): void {
    this.rental = JSON.parse(localStorage.getItem('Rental')!);
    this.payRentalApplication();
  }

  async payRentalApplication() {
    const rentalID = this.rental.rentalApplication.rentalID; 
    const amount = this.rental.rentalApplication.totalPrice; 

    try {
      const response = await this.dataService.payRentalApplication(rentalID, amount).toPromise();

      if (response) {
        console.log('Payment successful');
        
      } else {
        console.log('Payment failed');
        
      }
    } catch (error) {
      console.log('Error:', error);
      
    }
  }
  goBack() {
    this.router.navigateByUrl('/');
  } 
}


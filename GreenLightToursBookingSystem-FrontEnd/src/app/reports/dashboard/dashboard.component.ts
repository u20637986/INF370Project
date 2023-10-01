import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType,ChartData, ChartEvent } from 'chart.js';
import { DataService } from 'src/app/service/GLBSdataservice';
//import {RentalDataService} from 'src/app/service/rentalDataService';
import { SharedNavService } from 'src/app/service/shared-nav.service';
import { Booking } from 'src/app/shared/Bookings';
import { TravelPackage } from 'src/app/shared/travelPackage';
import { ServiceEntity } from 'src/app/shared/serviceentity';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {

  constructor(private dataService:DataService, private router:Router, public sharednavservice:SharedNavService){}

  services:any[] = [];
  servicetypes:any[] = [];
  totalRevenue!: number;
  serviceRevenue: number[] = [];
  serviceamount:number = 0;
  rentals:any[] = [];

  
  public doughnutChartType: ChartType = 'doughnut';

      public doughnutChartLabels: string[] = [];

      public doughnutChartData: ChartData<'doughnut'> = {
      labels: [],
      datasets: [
        { data: []},
      ],
      
  };



  travelPackages:TravelPackage[] = [];
  travelPackage!: TravelPackage;
  bookings:any[] = [];
  popularTravelPackage!: String; 
  amount:number = 0;
  popularamount:number = 0;
  bookingamount:number = 0;
  grandtotal:number = 0;
  ngOnInit(): void {
      this.popularamount = 0;
      this.bookingamount =0;
      this.serviceamount =0;
      this.totalRevenue = 0;
      this.servicetypes = [];
      this.serviceRevenue = [];
      this.dataService.GetShuttleReport().subscribe((result)=>{
      var temp:any[] = result
      temp.forEach((element)=>{
        this.grandtotal += element.subTotal
      })

      this.dataService.GetAllBookings().subscribe((result)=>{
        this.bookings = result;
        this.bookingamount = this.bookings.length;


        this.dataService.GetAllTravelPackage().subscribe((result)=>{
          this.travelPackages = result;
          
          this.travelPackages.forEach(tpackage => {
            this.amount = 0;
            this.popularTravelPackage = tpackage.name!;
            this.bookings.forEach(booking => {
              if(tpackage.travelPackageID == booking.travelPackageID)
              {
                this.amount++;
              }
            });


            if(this.amount > this.popularamount)
            {
              this.popularamount = this.amount;
              this.popularTravelPackage = tpackage.name!;
            }
          });
          

          this.bookings.forEach(element => {
            this.totalRevenue+= element.totalPrice;
          });

          
        this.dataService.GetAllServices().subscribe((services)=>{
          this.dataService.GetAllRentalApplications().subscribe((rentals)=>{

          
          this.services = services;
          this.rentals = rentals;

          this.rentals.forEach(element => {
            this.totalRevenue+= element.totalPrice;
          });

          this.services.forEach(service => {

            this.serviceamount = 0;
            this.bookings.forEach(x => {
              if (x.serviceId == service.serviceID)
              {
                this.serviceamount+= x.totalPrice;
              }
            });
  
  
            this.rentals.forEach(x => {
              if (x.serviceID == service.serviceID)
              {
                this.serviceamount+= x.totalPrice;
              }
            });
            

            if (this.serviceamount != 0)
            {
              console.log(this.serviceamount)
              console.log(this.totalRevenue)
              this.serviceRevenue.push(this.serviceamount/this.totalRevenue*100);
              this.servicetypes.push(service.name);
            }
            
          });


          this.doughnutChartData = {
            labels: this.servicetypes,
            datasets: [
              { data: this.serviceRevenue},
            ],
            
        };
        })
      })
        })
      })
    })
  }
}

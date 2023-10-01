import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartData, ChartType } from 'chart.js';
import { DataService } from 'src/app/service/GLBSdataservice';
import { SharedNavService } from 'src/app/service/shared-nav.service';
import { Booking } from 'src/app/shared/Bookings';
import { TravelPackage } from 'src/app/shared/TravelPackage';
import { ServiceEntity } from 'src/app/shared/serviceentity';

@Component({
  selector: 'app-sales-graph',
  templateUrl: './sales-graph.component.html',
  styleUrls: ['./sales-graph.component.scss']
})
export class SalesGraphComponent {

  constructor(private dataService:DataService, private router:Router, public sharednavservice:SharedNavService){}

  services:any[] = [];
  servicetypes:any[] = [];
  totalRevenue!: number;
  serviceRevenue: number[] = [];
  serviceamount:number = 0;

  generatedDate:string = Date()

  
  travelPackages:TravelPackage[] = [];
  travelPackage!: TravelPackage;
  bookings:Booking[] = [];
  popularTravelPackage!: String; 
  amount:number = 0;
  popularamount:number = 0;
  bookingamount:number = 0;
  grandtotal:number = 0;
  rentals:any[] = [];

  public barChartType: ChartType = 'bar';

  public barChartLabels: string[] = [];

  public barChartOptions: any = {
    legend: {
      display: false
    }
  };
  

  public barChartData: ChartData<'bar'> = {
  labels: [],
  datasets: [
    { data: []},
  ],
};





  ngOnInit(): void {
    this.serviceamount =0;
    this.totalRevenue = 0;
    this.servicetypes = [];
    this.serviceRevenue = [];

    this.dataService.GetAllBookings().subscribe((result)=>{
      this.dataService.GetAllRentalApplications().subscribe((rentals)=>{

      this.bookings = result;
      this.rentals = rentals;

      console.log(result);
      this.bookingamount = this.bookings.length;
      
        this.bookings.forEach(element => {
          this.totalRevenue+= element.totalPrice;
        });

        this.rentals.forEach(element => {
          this.totalRevenue+= element.totalPrice;
        });

        
      this.dataService.GetAllServices().subscribe((result)=>{
        this.services = result;
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
            this.serviceRevenue.push(this.serviceamount);
            this.servicetypes.push(service.name);
          }
        });

        console.log(this.serviceRevenue);
        this.barChartData = {
          labels: this.servicetypes,
          datasets: [
            { data: this.serviceRevenue, backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(54, 162, 235, 0.2)" , "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"], label: 'Highest sales'},
          ],
          
      };
      })
    })
      })
}
}

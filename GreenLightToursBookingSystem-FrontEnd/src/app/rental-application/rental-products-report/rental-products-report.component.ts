import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/rentalDataService';
import { SharedNavService } from 'src/app/service/shared-nav.service';
import { SharedDateFilter } from 'src/app/service/sharedDateFilter';

@Component({
  selector: 'app-rental-products-report',
  templateUrl: './rental-products-report.component.html',
  styleUrls: ['./rental-products-report.component.scss']
})
export class RentalProductsReportComponent {

  reportData: any;
  errorMessage!: string;  
  showToolbar:boolean=true
  showButton:boolean=true
  generatedDate:string = Date()

  constructor(private dataService: DataService, public sharednavservice:SharedNavService, private sharedDateFilter: SharedDateFilter, private router: Router){}

  fetchReport(startDate: string, endDate: string) {
    this.dataService.getRentalReport(startDate, endDate).subscribe(
      (data) => {
        this.reportData = data;
        console.log(data)
       
      },
      (error) => {
        this.reportData = null;
          this.errorMessage = 'Error fetching rental report. Please try again later.';
      }
    );
  }
  print() {
    this.sharednavservice.hideSideNav = true;
    this.sharednavservice.hideToolBar = true;
    this.sharedDateFilter.hideStartDate = true;
    this.sharedDateFilter.hideEndDate= true;
    this.sharedDateFilter.button = true;
    this.showToolbar = false;
    this.showButton = false
    setTimeout(this.printWindow,1000)

    window.onafterprint = (event)=>{
      this.sharednavservice.hideSideNav = false;
      this.sharednavservice.hideToolBar = false;
      this.sharedDateFilter.hideStartDate = false;
      this.sharedDateFilter.hideEndDate=false;
      this.sharedDateFilter.button=false;
      this.showToolbar = true
      this.showButton = true
    }
   }

   printWindow(){
    window.print()
   } 
   goBack(): void {
    this.router.navigate(['/']); 
  }
  
  
}

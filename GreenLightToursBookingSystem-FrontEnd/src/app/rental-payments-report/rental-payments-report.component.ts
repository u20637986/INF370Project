import { Component, OnInit } from '@angular/core';
import { RentalReportService } from '../service/rental-report.service';
import { Router } from '@angular/router';
import { RentalReport } from '../shared/rentalReport';
import { SharedNavService } from '../service/shared-nav.service';


@Component({
  selector: 'app-rental-payments-report',
  templateUrl: './rental-payments-report.component.html',
  styleUrls: ['./rental-payments-report.component.scss']
})

export class RentalPaymentReportComponent implements OnInit {
 

  constructor(private rentalReportService: RentalReportService,public sharednavservice:SharedNavService) {}

  rentalReport:RentalReport[]=[]
  grandtotal:number=0
  grandTotalRefined:number=0
  grandT:number[]=[];
  showButton:boolean=true;
  showToolbar:boolean=true
  generatedDate:string=Date()

  ngOnInit():void{
    console.log(this.generatedDate)
    this.rentalReportService.getRevenueReport().subscribe((result)=>{
      var temp:any[]=result
      temp.forEach((element)=>{
        this.rentalReport.push(element)
        this.grandtotal+=element.subTotal
      })
      console.log(this.grandtotal)
      localStorage.setItem("grandTotal", this.grandtotal.toString())
      this.grandTotalRefined=+ localStorage.getItem("grandTotal")!
    console.log("grandtotal: ", this.grandTotalRefined)
    })

    
  }


  print(){

    this.sharednavservice.hideSideNav = true;
    this.sharednavservice.hideToolBar = true;
    this.showToolbar = false;
    this.showButton = false
    setTimeout(this.printWindow,1000)

    window.onafterprint = (event)=>{
      this.sharednavservice.hideSideNav = false;
      this.sharednavservice.hideToolBar = false;
      this.showToolbar = true
      this.showButton = true
    }
  }

  printWindow(){
    window.print()
  }
  
}

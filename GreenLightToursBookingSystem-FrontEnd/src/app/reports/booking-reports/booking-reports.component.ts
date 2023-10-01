import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { SharedNavService } from 'src/app/service/shared-nav.service';
import { Report } from 'src/app/shared/report';
// import {html2pdf} from 'html2pdf.js';
// import { jsPDF } from "jspdf";
// import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-booking-reports',
  templateUrl: './booking-reports.component.html',
  styleUrls: ['./booking-reports.component.scss']
})
export class BookingReportsComponent implements OnInit{
  
  constructor(private dataService:DataService, private router:Router, public sharednavservice:SharedNavService){}
  report:Report[]=[]
  grandtotal:number = 0
  grandTotRefined:number =0
  grandT: number[]= [];
  showToolbar:boolean=true
  showButton:boolean=true
  generatedDate:string = Date()
  ngOnInit(): void {
  
    console.log(this.generatedDate)
    this.dataService.GetShuttleReport().subscribe((result)=>{
      var temp:any[] = result
      temp.forEach((element)=>{
        this.report.push(element)
        this.grandtotal += element.subTotal
      })
      console.log(this.grandtotal)
      localStorage.setItem("grandTot", this.grandtotal.toString())

      this.grandTotRefined = +localStorage.getItem("grandTot")!
    console.log("grandtotal: " ,this.grandTotRefined)
    //this.sharednavservice.hideSideNav = true;
   //this.sharednavservice.hideToolBar = true;
   console.log(this.grandTotRefined)
    })
    
  }

  // hideforprint(){
  //   this.sharednavservice.hideSideNav = true
  //   this.sharednavservice.hideToolBar = true
  // }


  print() {
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

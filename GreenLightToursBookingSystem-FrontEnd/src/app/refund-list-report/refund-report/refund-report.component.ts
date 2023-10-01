import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { Refund } from 'src/app/shared/Refund';
import jsPDF from 'jspdf';
import html2Canvas from 'html2Canvas';
import { SharedNavService } from 'src/app/service/shared-nav.service';

@Component({
  selector: 'app-refund-report',
  templateUrl: './refund-report.component.html',
  styleUrls: ['./refund-report.component.scss']
})
export class RefundReportComponent {
  refunds:Refund[]=[]
  currentDate: string = new Date().toDateString();
  constructor(private dataService: DataService, private router: Router, public sharednavservice:SharedNavService) { }
  showToolbar:boolean=true
  showButton:boolean=true
  
  ngOnInit(): void {
    this.GetAllRefunds()
    
  }

  GetAllRefunds() {
    this.dataService.GetAllRefunds().subscribe((result: any[]) => {
      this.refunds = result.filter((element) => element.refundStatusID === 1);
    });
  }

  
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

  // downloadAsPDF() {
  //   const containerId = 'pdfContent-';
  //   const content = document.getElementById(containerId);
  
  //   if (content) {
  //     html2Canvas(content).then(canvas => {
  //       const contentDataURL = canvas.toDataURL('image/png');
  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       const width = pdf.internal.pageSize.getWidth();
  //       const height = canvas.height * width / canvas.width;
  
  //       // Set background color for the header banner
  //       pdf.setFillColor(204, 255, 204); // Light green color
  //       pdf.rect(0, 0, width, 15, 'F'); // Smaller banner rectangle
  
  //       // Add header text
  //       const header = 'Refund List Report';
  //       pdf.setFontSize(16);
  //       pdf.setTextColor(0); // Black color
  //       pdf.text(header, width / 2, 10, { align: 'center' });
  
  //       // Calculate content height without header
  //       const contentHeight = height - 15;
  
  //       // Adjust the positioning and size of the content
  //       const contentWidth = width * 0.8; // Make content slightly smaller
  //       const contentX = (width - contentWidth) / 2;
  //       const contentY = 20; // Adjust as needed
  
  //       // Add content
  //       pdf.addImage(contentDataURL, 'PNG', contentX, contentY, contentWidth, contentHeight);
  
  //       pdf.save('Refund-list-report.pdf');
  //     });
  //   }
  // }
}

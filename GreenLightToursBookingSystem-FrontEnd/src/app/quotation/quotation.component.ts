import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/GLBSdataservice';
import { Quotation } from '../shared/Quotation';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit  {

  quotations:Quotation[]=[]
  @ViewChild('pdfContent', { static: false }) pdfContent!: ElementRef;

  constructor(private dataService: DataService, private router: Router) {
    
   }

  ngOnInit(): void {
    this.GetAllQuotation()
  }

  GetAllQuotation()
  {
    this.dataService.GetAllQuotation().subscribe(result => {
      let quotationList:any[] = result
      quotationList.forEach((element) => {
        this.quotations.push(element)
      });
    })
  }

  calculateTotal(quotation: Quotation): number {
    // Add null checks for quantity and amount
    if (quotation.quantity !== null && quotation.amount !== null) {
      return quotation.quantity * quotation.amount;
    } else {
      return 0;
    }
  }

  downloadAsPDF(index: number) {
    const containerId = 'pdfContent-' + index;
    const content = document.getElementById(containerId);

    const pdf = new jsPDF();
    const logo = `
      <span class="example-spacer"></span>
      <img src="assets/img/logoa.png" class="img-fluid"> Green Light Tours
      <span class="example-spacer"></span>
    `;
    const img = new Image();
    img.src = '../../assets/img/logoa.jpeg';
    img.onload = () => {
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = 30; 
      const xPosition = (pdfWidth - imgWidth) / 2; 

      pdf.addImage(img, 'PNG', xPosition, 15, imgWidth, imgWidth);

  
    if (content) {
      html2canvas(content).then(canvas => {
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = canvas.height * width / canvas.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
        pdf.save('Quotation.pdf');
      });
    }
  }
  
}  }

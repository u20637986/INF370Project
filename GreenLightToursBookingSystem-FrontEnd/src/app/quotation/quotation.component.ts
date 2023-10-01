import { Component, OnInit } from '@angular/core';
import { Quotation } from '../shared/Quotation';
import { Router } from '@angular/router';
import { DataService } from '../service/GLBSdataservice';

@Component({
  selector: 'app-quotation',
  templateUrl: './quotation.component.html',
  styleUrls: ['./quotation.component.scss']
})
export class QuotationComponent implements OnInit  {

  quotations:Quotation[]=[]
  constructor(private dataService: DataService, private router: Router) { }

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

}

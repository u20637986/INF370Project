import { Component, OnInit } from '@angular/core';
import { Refund } from '../shared/Refund';
import { DataService } from '../service/GLBSdataservice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {
  display = "none";
refunds:Refund[]=[]
filteredRefunds: Refund[] = []; // Added this array to hold filtered refunds
searchText: string = ''; 


searchTerm: string = '';

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.GetAllRefunds()
  }

  GetAllRefunds()
  {
    this.dataService.GetAllRefunds().subscribe(result => {
      let refundList:any[] = result
      refundList.forEach((element) => {
        this.refunds.push(element)
        this.applyFilter();
      });
    })
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  applyFilter() {
    this.filteredRefunds = this.refunds.filter(refund => {
      const searchLower = this.searchText.toLowerCase();
      const nameMatch = refund.name.toLowerCase().includes(searchLower);
      const amountMatch = this.searchText === '' || refund.amount.toString().includes(searchLower);
      const dateMatch = this.searchText === '' || refund.date.includes(searchLower);

      return nameMatch || amountMatch || dateMatch;
    });
  }
}

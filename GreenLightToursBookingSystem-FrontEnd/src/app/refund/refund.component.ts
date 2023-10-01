import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/GLBSdataservice';
import { VMrefund } from '../shared/VMrefund';
import { refundStatus } from '../shared/refundStatus';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent implements OnInit {
  refunds: VMrefund[] = [];
  refundStatuses: refundStatus[] = [];
  x:any[]=[]
  cdr: any;
  searchText: string = '';


  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.loadRefunds();
  }

  loadRefunds() {
    this.dataService.GetAllRefunds().subscribe((refundList: any[]) => {
      const observables = refundList.map((element) =>
        this.dataService.GetAllRefundStatus().pipe(
          map((refundStatusList: any[]) => {
            const refundStatusData = refundStatusList.find(
              (x) => x.refundStatusID === element.refundStatusID
            );
            return {
              refundID: element.refundID,
              name: element.name,
              amount: element.amount,
              date: element.date,
              refundStatus: refundStatusData || { description: 'Unknown' }, // Default value if not found
            };
          })
        )
      );

      forkJoin(observables).subscribe((results) => {
        this.refunds = results;
      });
    });
  }

  EditRefund(selected: VMrefund) {
    this.dataService.EditRefund(selected.refundID, selected).subscribe((response: any) => {});
    this.loadRefunds();
  }

  formatDate(date: string): string {
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const day = parsedDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  applyFilter() {
    const searchText = this.searchText.toLowerCase();
    this.refunds = this.refunds.filter((refund) =>
      refund.name.toLowerCase().includes(searchText) || refund.date.includes(searchText)
    );
  }
  clearFilter() {
    this.searchText = '';
    this.loadRefunds();
  }
    
  
}

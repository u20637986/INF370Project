import { Component, EventEmitter, Output } from '@angular/core';
import { SharedDateFilter } from 'src/app/service/sharedDateFilter';

@Component({
  selector: 'app-filter-report-by-date',
  templateUrl: './filter-report-by-date.component.html',
  styleUrls: ['./filter-report-by-date.component.scss']
})
export class FilterReportByDateComponent {
  startDate!: string;
  endDate!: string;
  selectedDates!: { startDate: string, endDate: string };
  @Output() filterDates: EventEmitter<{ startDate: string, endDate: string }> = new EventEmitter();

  constructor(public sharedDateFilter:SharedDateFilter){}

  applyFilter() {
   
    if (this.startDate && this.endDate) {
      this.selectedDates = { startDate: this.startDate, endDate: this.endDate };
      this.filterDates.emit(this.selectedDates);
    }
  }
  minEndDate(): string {
    if (this.startDate) {
      const startDateAsDate = new Date(this.startDate);
  
     
      if (!isNaN(startDateAsDate.getTime())) {
        const collectionDate = new Date(startDateAsDate);
        collectionDate.setDate(collectionDate.getDate() +1);
        return collectionDate.toISOString().slice(0, 10);
      }
    }
  
    return '';
  }
  
}

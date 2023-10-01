import { Component, Input, OnInit , ElementRef,  ViewChild} from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDatepicker } from '@angular/material/datepicker';
import { DataService } from 'src/app/service/rentalDataService';

@Component({
  selector: 'app-vehicle-availability',
  templateUrl: './vehicle-availability.component.html',
  styleUrls: ['./vehicle-availability.component.scss']
})
export class VehicleAvailabilityComponent {
  @Input() selectedVehicleID!: number;
  @ViewChild('inputField') inputField!: ElementRef;
  @ViewChild('picker') picker!: MatDatepicker<Date>;

  unavailableDates: Date[] = [];
  highlightedDates: Date[] = [];
  selectedDate: Date | null = null;

  constructor(private dataService: DataService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.selectedVehicleID = +params['vehicleID'];
      this.getUnavailableDates();
    });
  }

  getUnavailableDates() {
    if (!this.selectedVehicleID) {
      return;
    }

    this.dataService.GetUnavilableDatesPerVehicle(this.selectedVehicleID).subscribe(
      (dates: string[]) => {
        if (Array.isArray(dates)) {
          this.unavailableDates = dates.map((dateString) => new Date(dateString));
        } else {
          console.error('Invalid API response format:', dates);
        }
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }
  dateFilter = (date: Date | null): boolean => {
    if (date === null) {
    
      return true;
    }

    const isDateUnavailable = this.unavailableDates.some(d => d.getTime() === date.getTime());
    return !isDateUnavailable;
  };

  clearSelectedDate() {
    
    this.selectedDate = null;
  }
}
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { BookingType } from '../shared/bookingtype';

@Component({
  selector: 'app-booking-type',
  templateUrl: './booking-type.component.html',
  styleUrls: ['./booking-type.component.scss']
})
export class BookingTypeComponent implements AfterViewInit, OnInit{

  

bookingTypes: BookingType[]=[];
  displayedColumns: string[] = ['Name', 'Description','Update', 'Delete'];
  dataSource = new MatTableDataSource<BookingType>();
  constructor(private dataService: DataService, private router: Router) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    /**
     * This code duplication is not necessary!
     * 
     * Consider using it only once!!
     */
    this.dataService.GetAllBookingTypes()
    .subscribe((bookingType: any) => {
      this.dataSource.data = bookingType
    });
    this.getBookingTypes()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getBookingTypes() {
    this.dataService.GetAllBookingTypes().subscribe(result => {
      let bookingTypeList: any[] = result
      bookingTypeList.forEach((element) => {
        this.bookingTypes.push(element)
      });
    })
  }

  deleteBookingType(bookingTypeID: number) {

    if (confirm('Are you sure you want to delete this booking type?')) {
      this.dataService.DeleteBookingType(bookingTypeID).subscribe(result => {
        window.location.reload();
        this.getBookingTypes();
      })
    }

  }

}

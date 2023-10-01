import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/trailer.service';
import { Trailer } from '../shared/trailer';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.scss']
})
export class TrailerComponent implements AfterViewInit, OnInit {

  //@Input() trailer!: Trailer;
  trailers: Trailer[] = [];
  displayedColumns: string[] = ['Image', 'Status', 'Rental Price', 'Size', 'Registration Number', 'Trailer Type', 'Floor Base', 'Panels', 'Update', 'Delete', 'Inspect'];
  dataSource = new MatTableDataSource<Trailer>();

  constructor(private dataService: DataService, private router: Router, private modalService:ModalService) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {
    /**
     * This code duplication is not necessary!
     * 
     * Consider using it only once!!
     */
    this.dataService.getTrailers()
      .subscribe((trailer: any) => {
        this.dataSource.data = trailer
      });
    this.getTrailers()
    console.log(this.trailers)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTrailers() {
    this.dataService.getTrailers().subscribe(result => {
      let trailerList: any[] = result
      trailerList.forEach((element) => {
        this.trailers.push(element)
      });
    })
  }

  /*deleteTrailer(trailerId: Number) {

    if (confirm('Are you sure you want to delete this trailer?')) {
      this.dataService.deleteTrailer(trailerId).subscribe(result => {
        window.location.reload();
        this.getTrailers();
      })
    }

  }*/

  deleteTrailer(trailerId: number) {
    // Check if there are active rental applications for the trailer
    this.dataService.hasActiveRentalApplicationsForTrailer(trailerId).subscribe(
      (hasActiveRentalApplications: boolean) => {
        if (hasActiveRentalApplications) {
          // Alert the user that the trailer cannot be deleted due to active rental applications
          alert('This trailer cannot be deleted because there are active rental applications.');
          this.modalService.openErrorModal('This trailer cannot be deleted because it has active rental applications.');
  
          // Optionally, you can redirect the user to a different page or take other actions.
        } else {
          // Confirm with the user before proceeding with the deletion
          if (confirm('Are you sure you want to delete this trailer?')) {
            // If the user confirms, delete the trailer
            this.dataService.deleteTrailer(trailerId).subscribe(
              (result) => {
                // Optionally, you can handle the deletion success, e.g., show a success message.
                console.log('Trailer deleted successfully.');
                window.location.reload();
                this.getTrailers();
              },
              (error) => {
                // Handle the deletion error, e.g., show an error message.
                console.error('Error deleting trailer:', error);
              }
            );
          }
        }
      },
      (error) => {
        // Handle the error when checking for active rental applications
        console.error('Error checking for active rental applications:', error);
      }
    );
  }
  


  editTrailer(trailerId: Number) {
    this.router.navigate(['/edit-trailer', trailerId]);

  }
}
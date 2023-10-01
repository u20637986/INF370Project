import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/trailer.service';
import { Trailer } from '../shared/trailer';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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

  constructor(private dataService: DataService, private router: Router) { }
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

  deleteTrailer(trailerId: Number) {

    if (confirm('Are you sure you want to delete this trailer?')) {
      this.dataService.deleteTrailer(trailerId).subscribe(result => {
        window.location.reload();
        this.getTrailers();
      })
    }

  }


  editTrailer(trailerId: Number) {
    this.router.navigate(['/edit-trailer', trailerId]);

  }
}

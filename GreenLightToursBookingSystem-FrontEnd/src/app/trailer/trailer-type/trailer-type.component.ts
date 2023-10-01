import {  AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/trailer.service';
import { TrailerType } from 'src/app/shared/trailertype';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-trailer-type',
  templateUrl: './trailer-type.component.html',
  styleUrls: ['./trailer-type.component.scss']
})
export class TrailerTypeComponent implements AfterViewInit, OnInit {

  trailerTypes: TrailerType[] = [];
  displayedColumns: string[] = ['Name', 'Description', 'Update', 'Delete'];
  dataSource = new MatTableDataSource<TrailerType>();

  constructor(private dataService: DataService, private router: Router) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(): void {

    this.dataService.getTrailerTypes()
      .subscribe((trailerType: any) => {
        this.dataSource.data = trailerType
      });
    this.getTrailerTypes()
    console.log(this.trailerTypes)
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTrailerTypes() {
    this.dataService.getTrailerTypes().subscribe(result => {
      let trailerTypeList: any[] = result
      trailerTypeList.forEach((element) => {
        this.trailerTypes.push(element)
      });
    })
  }

  deleteTrailerTypes(trailerTypeId: number) {

    if (confirm('Are you sure you want to delete this trailer type?')) {
      this.dataService.deleteTrailerType(trailerTypeId).subscribe(result => {
        window.location.reload();
        this.getTrailerTypes();
      })
    }

  }


  editTrailerTypes(trailerTypeId: Number) {
    this.router.navigate(['/edit-trailer-type', trailerTypeId]);

  }
}
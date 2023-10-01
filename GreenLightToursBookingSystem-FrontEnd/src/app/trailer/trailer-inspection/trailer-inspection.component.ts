import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/service/trailer.service';
import { Inspection } from 'src/app/shared/trailerInspection';


@Component({
  selector: 'app-trailer-inspection',
  templateUrl: './trailer-inspection.component.html',
  styleUrls: ['./trailer-inspection.component.scss']
})
export class TrailerInspectionComponent {


  inspections: Inspection[]=[];
  userID!:number;
  displayedColumns:string[]=['Registration Number', 'Status', 'Checked-In/ Checked-Out','Inspection Outcome','Date','Conducted by']

  dataSource=new MatTableDataSource<Inspection>();

  constructor(private dataService: DataService, ){}
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit():void{
    this.dataService.getInspections().subscribe((inspection:any)=>{this.dataSource.data=inspection});
    this.getInspections()
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getInspections(){
    this.dataService.getInspections().subscribe(result=>{
      let inspectionList:any[]=result
      inspectionList.forEach((element)=>{
        this.inspections.push(element)
      });
    })
  }

}
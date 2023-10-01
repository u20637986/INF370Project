import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { licenseCode } from 'src/app/shared/licenseCode';

@Component({
  selector: 'app-license-code',
  templateUrl: './license-code.component.html',
  styleUrls: ['./license-code.component.scss']
})
export class LicenseCodeComponent implements AfterViewInit, OnInit{

licenseCodes: licenseCode[]=[];
  displayedColumns: string[] = ['Name', 'Description','Update', 'Delete'];
  dataSource = new MatTableDataSource<licenseCode>();
  constructor(private dataService: DataService, private router: Router) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    /**
     * This code duplication is not necessary!
     * 
     * Consider using it only once!!
     */
    this.dataService.GetAllLicenseCodes()
    .subscribe((licenseCode: any) => {
      this.dataSource.data = licenseCode
    });
    this.getLicenseCodes()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getLicenseCodes() {
    this.dataService.GetAllLicenseCodes().subscribe(result => {
      let licenseCodeList: any[] = result
      licenseCodeList.forEach((element) => {
        this.licenseCodes.push(element)
      });
    })
  }

  deleteLicenseCode(licenseCodeID: number) {

    if (confirm('Are you sure you want to delete this license code?')) {
      this.dataService.deleteLicenseCode(licenseCodeID).subscribe(result => {
        window.location.reload();
        this.getLicenseCodes();
      })
    }

  }


  editLicenseCode(licenseCodeID: number) {
    this.router.navigate(['/edit-license-code', licenseCodeID]);

  }
}

import { Component, OnInit, RendererType2,ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/service/rentalDataService';
import { VehicleType } from 'src/app/shared/VehicleType';
import { Rental } from 'src/app/shared/rental';
import { RentalBase } from 'src/app/shared/rentalBase';
import { Vehicle } from 'src/app/shared/vehicle';
import { VehicleBase } from 'src/app/shared/vehicleBase';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';




@Component({
  selector: 'app-vehicle-rental-list',
  templateUrl: './vehicle-rental-list.component.html',
  styleUrls: ['./vehicle-rental-list.component.scss']
})
export class VehicleRentalListComponent implements OnInit {
  
  vehicle:Vehicle[]=[];
  rental:Rental[]=[];
  data= this.rental;
  fileName: string = 'vehicle-rental-report-list';

  constructor(private dataService:DataService, private router:Router) {}

  ngOnInit(): void {
    this.getVehicleRentalList()
   //console.log(this.rental)
  }
  
  
  getVehicleRentalList() {
    this.dataService.GetAllRentalApplications().subscribe((result: any[]) => {
      result.forEach((element) => {
        let myrental: Rental = element;
        console.log(myrental);
  
        forkJoin([
          this.dataService.getVehicles(),
          this.dataService.getVehicleTypes()
        ]).subscribe(([vehicles, vehicleTypes]) => {
          let matchingVehicle = vehicles.find((vehicle:any) => vehicle.vehicleID === myrental.vehicleID);
  
          if (matchingVehicle) {
            myrental.vehicle = matchingVehicle.vehicleName;
            myrental.vehicleRegistration = matchingVehicle.registrationNumber;
  
            let matchingVehicleType = vehicleTypes.find((vType) => vType.vehicleTypeID === matchingVehicle?.vehicleTypeID);
  
            if (matchingVehicleType) {
              myrental.vehicleType = matchingVehicleType.name;
            }
  
            this.rental.push(myrental);
            console.log(myrental);
          } else {
            console.log('error generating list report');
          }
        });
      });
    });
  }
 
  exportToExcel() {
    // Define a type for pivotData
    type PivotData = { [key: string]: number };
  
    // Initialize pivotData as an empty object of the defined type
    const pivotData: PivotData = {};
  
    // Step 1: Prepare data for the pivot table
    this.rental.forEach((item) => {
      const vehicleType = item.vehicleType;
      if (!pivotData[vehicleType]) {
        pivotData[vehicleType] = 0;
      }
      pivotData[vehicleType]++;
    });
  
    // Step 2: Create the pivot table as an array of objects
    const pivotTable = Object.keys(pivotData).map((vehicleType) => ({
      'Vehicle Type': vehicleType,
      'Total Rentals': pivotData[vehicleType],
    }));
  
    // Calculate the Grand Total
    const grandTotal = pivotTable.reduce((total, row) => total + row['Total Rentals'], 0);
    pivotTable.push({ 'Vehicle Type': 'Grand Total', 'Total Rentals': grandTotal });
  
    // Step 3: Export the pivot table to Excel
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    const dataWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(pivotTable);
  
    // Customize formatting as needed (e.g., headers, date, etc.)
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString().replace(/\//g, '-');
    const formattedTime = currentDate.toLocaleTimeString();
    const fileName = `VehicleRentalPivotTable_${formattedDate}_${formattedTime}.xlsx`;
  
    // Set the width of column A to 20 and column B to 20
    const colWidths = [{ wch: 20 }, { wch: 20 }];
    dataWorksheet['!cols'] = colWidths;
  
    // Add headers and data to the worksheet, starting from cell A1
    XLSX.utils.sheet_add_json(dataWorksheet, pivotTable, { origin: 'A2' }); // Start from row 2
  
    // Add the header in row 1
    dataWorksheet['A1'] = { v: 'Total rentals per vehicle type', t: 's' }; // 's' stands for string
    dataWorksheet['B1'] = {}; // Empty cell to align with 'Total Rentals' column
  
    XLSX.utils.book_append_sheet(workbook, dataWorksheet, 'VehicleRentalPivotTable');
  
    // Apply bold and light green formatting to cells A1 and B1
    dataWorksheet['A1'].s = { font: { bold: true }, fill: { fgColor: { rgb: '00FF00' } } };
    dataWorksheet['B1'].s = { font: { bold: true }, fill: { fgColor: { rgb: '00FF00' } } };
  
    // Step 4: Export the workbook to a downloadable Excel file
    const excelBuffer: any = XLSX.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
  
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const blobUrl = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
  
    link.click();
  
    document.body.removeChild(link);
  }
  
  goBack() {
    this.router.navigateByUrl('/');
  } 
}

import { Component, OnInit, RendererType2,ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/service/rentalDataService';
import { VehicleType } from 'src/app/shared/VehicleType';
import { Rental } from 'src/app/shared/rental';
import { RentalBase } from 'src/app/shared/rentalBase';
import { Vehicle } from 'src/app/shared/vehicle';
import { VehicleBase } from 'src/app/shared/vehicleBase';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';



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

  constructor(private dataService:DataService) {}

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
    
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    const formattedData = this.rental.map((item) => ({
      'Rental ID': item.rentalID,
      'Vehicle Name': item.vehicle,
      'Vehicle Type': item.vehicleType,
      'License Plate': item.vehicleRegistration,
      'Rental Start Date': item.startDate,
      'Rental End Date': item.endDate
    }));
  
    const dataWorksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(formattedData);
   const header = [['Rental ID', 'Vehicle Name', 'Vehicle Type', 'License Plate', 'Rental Start Date', 'Rental End Date']];
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString().replace(/\//g, "-"); 
    const fileName = `VehicleRentalListReport_${formattedDate}.xlsx`;
    const formattedTime = currentDate.toLocaleTimeString();

   // const generateLabel = [['Generate at:', formattedDate, 'at', formattedTime]];
  
    dataWorksheet['A1'].t = 's'; 
    dataWorksheet['A1'].v = 'Vehicle Rental List'; 
    dataWorksheet['A1'].s = { alignment: { horizontal: 'center' } };
    dataWorksheet['A2'].t = 's'; 
    dataWorksheet['A2'].v = ''; 
    dataWorksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 1, c: header[0].length - 1 } }];
    
    dataWorksheet['A3'] = { t: 's', v: 'Generate at:', s: { alignment: { horizontal: 'center' } } };
   //dataWorksheet['!merges'].push({ s: { r: 2, c: 0 }, e: { r: 2, c: header[0].length - 1 } });
    dataWorksheet['B3'] = { t: 's', v: `${formattedDate} at ${formattedTime}`, s: { alignment: { horizontal: 'center' } } };
    dataWorksheet['!merges'].push({ s: { r: 2, c: 1 }, e: { r: 2, c: header[0].length - 1 } });
    const colWidths = header[0].map(() => ({ wch: 15 })); 
    dataWorksheet['!cols'] = colWidths;

    XLSX.utils.sheet_add_aoa(dataWorksheet, header, { origin: 'A4' });
    XLSX.utils.sheet_add_json(dataWorksheet, formattedData, { origin: 'A4' });
   XLSX.utils.book_append_sheet(workbook, dataWorksheet, 'VehicleRentalList');
  
  
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
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
}

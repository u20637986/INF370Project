import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../service/GLBSdataservice';
import { VehicleBase } from '../shared/vehicleBase';
import { Inspection } from '../shared/inspection';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';


@Component({
  selector: 'app-vehicle-inspection-list',
  templateUrl: './vehicle-inspection-list.component.html',
  styleUrls: ['./vehicle-inspection-list.component.scss'],
})
export class VehicleInspectionListComponent implements OnInit {

  @ViewChild('reportContent', {static:false}) reportContent!: ElementRef;

  reportsData: { registrationNumber: string, date: Date, status: string, nextDate: Date }[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.refreshReportData();
  }

  refreshReportData() {
    this.dataService.getVehicles().subscribe((vehicles: VehicleBase[]) => {
      this.dataService.GetInspections().subscribe((inspections: Inspection[]) => {
        this.reportsData = vehicles.map(vehicle => {
          const vehicleInspections = inspections.filter(item => item.registrationNumber === vehicle.registrationNumber);
          if (vehicleInspections.length > 0) {
            const latestInspection = vehicleInspections.reduce((latest, current) =>
              current.date > latest.date ? current : latest
            );
            return {
              registrationNumber: vehicle.registrationNumber,
              date: latestInspection.date,
              status: latestInspection.result,
              nextDate: this.calculateNextDate(latestInspection.date)
            };
          } else {
            return {
              registrationNumber: vehicle.registrationNumber,
              date: new Date(),
              status: 'Inspection Pending',
              nextDate: new Date()
            };
          }
        });
      });
    });
  }

  calculateNextDate(date: Date): Date {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 5);
    return nextDate;
  }

  downloadReport() {
    const pdf = new jsPDF();

    const logo = `
      <span class="example-spacer"></span>
      <img src="assets/img/logoa.png" class="img-fluid"> Green Light Tours
      <span class="example-spacer"></span>
    `;
    const img = new Image();
    img.src = 'assets/img/logoa.png';
    img.onload = () => {
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = 30; 
      const xPosition = (pdfWidth - imgWidth) / 2; 

      pdf.addImage(img, 'PNG', xPosition, 15, imgWidth, imgWidth);

      autoTable(pdf,{
        html: '#reportContent',
        startY: 50,
        theme: 'grid', 
        headStyles: {
          fillColor: [0, 78, 4],
          textColor: [255, 255, 255], 
        },
        alternateRowStyles: {
          fillColor: [200, 255, 200], 
        },
      });

      // Save the PDF
      pdf.save('VehicleInspection.pdf');
    };
  }
  
}


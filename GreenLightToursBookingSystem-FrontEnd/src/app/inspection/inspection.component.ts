import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/GLBSdataservice';
import { InspectionStatus } from '../shared/inspection-status';
import { VehicleStatus } from '../shared/VehicleStatus';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inspection',
  templateUrl: './inspection.component.html',
  styleUrls: ['./inspection.component.scss']
})
export class InspectionComponent implements OnInit {

  inspect: InspectionStatus[] = []
  constructor(private dataService: DataService, private route:Router){}

  ngOnInit(): void {
    this.getInspection()
  }

  getInspection(){
    this.dataService.GetInspections().subscribe(result => {
      let inspectList:any[] = result;
      inspectList.forEach((element) => {
        let inspection: InspectionStatus = element
        

        this.dataService.getVehicleStatus().subscribe(vehicleStatus => {
          let status: VehicleStatus[] = vehicleStatus
          let stat = status.find(stat => stat.vehicleStatusID === inspection.vehicleStatusID);

          if(stat){
            inspection.vehicleStatus = stat.name
            this.inspect.push(inspection);
          }
        })
      })
    })
  }

  AddIn(){
    this.route.navigate(['/add-inspection'])
  }

}

import { Component } from '@angular/core';
import { TravelPackage } from '../shared/travelPackage';
import { DataService } from '../service/GLBSdataservice';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { TravelPackageStatus } from '../shared/travelPackageStatus';
import { VMtravelPackage } from '../shared/VMtravelpackage';
import { HelpParagraphService } from '../service/help-paragraph.service';

@Component({
  selector: 'app-travelpackage',
  templateUrl: './travelpackage.component.html',
  styleUrls: ['./travelpackage.component.scss']
})
export class TravelPackageComponent {
  display = "none";

  travelPackages:VMtravelPackage[] =[]
  travelPackageStatuses:TravelPackageStatus[]=[]

  constructor(private dataService: DataService, private router: Router, private dialogRef:MatDialog) { 
    
  }

  ngOnInit(): void {
   
    this.GetAllTravelPackage()
   }

   openModal() {
    this.display = "block";
  }
 
  GetAllTravelPackage()
  {
    this.dataService.GetAllTravelPackage().subscribe(result => {
      let travelPackageList:any[] = result
      travelPackageList.forEach((element) => {
      element.imageBase64 = 'data:image/jpeg;base64,' + element.imageBase64

        this.dataService.GetAllTravelPackageStatus().subscribe(result => {
          let travelPackageStatusList:any[] = result
          travelPackageStatusList.forEach((element) => {
            this.travelPackageStatuses.push(element)
          });
          
          element.travelPackageStatus = travelPackageStatusList.find(x => x.travelPackageStatusID == element.travelPackageStatusID);
          this.travelPackages.push(element)
        })
      });
    })

  }

  DeleteTravelPackage(travelPackageID: Number){
    
    this.dataService.DeleteTravelPackage(travelPackageID).subscribe(result => {
      window.location.reload();
      });
    }

    EditTravelPackage(travelPackageID:Number)
  {
    this.dataService.setSelectedTravelPackage(travelPackageID);
    this.router.navigate(['/edit-travelpackage']);
  }

}
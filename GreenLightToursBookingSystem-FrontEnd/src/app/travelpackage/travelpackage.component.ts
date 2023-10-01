import { Component } from '@angular/core';
import { TravelPackage } from '../shared/travelPackage';
import { DataService } from '../service/GLBSdataservice';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-travelpackage',
  templateUrl: './travelpackage.component.html',
  styleUrls: ['./travelpackage.component.scss']
})
export class TravelPackageComponent {
  display = "none";

  travelPackages:TravelPackage[] =[]

  constructor(private dataService: DataService, private router: Router, private dialogRef:MatDialog) { }


  ngOnInit(): void {
   
    this.GetAllTravelPackage()
   }

   openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  GetAllTravelPackage()
  {
    this.dataService.GetAllTravelPackage().subscribe(result => {
      let travelPackageList:any[] = result
      travelPackageList.forEach((element) => {
        this.travelPackages.push(element)
      });
    })
  }

  DeleteTravelPackage(travelPackageID: Number){
    
    this.dataService.DeleteTravelPackage(travelPackageID).subscribe(result => {
      window.location.reload();
      });
    }

}
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { TravelPackage } from 'src/app/shared/travelPackage';

@Component({
  selector: 'app-add-travelpackage',
  templateUrl: './add-travelpackage.component.html',
  styleUrls: ['./add-travelpackage.component.scss']
})
export class AddTravelPackageComponent implements OnInit {

  travelPackage: TravelPackage = {
    travelPackageID:0,
    name:'',
    description:'',
    price:0,
    date:''
  };

  TravelPackageForm = new FormGroup(
    {
        name: new FormControl(''),
        description: new FormControl(''),
        price: new FormControl(0),
        date: new FormControl('')
    })

    constructor(private dataService: DataService, private router: Router) { }

    ngOnInit(): void {
    }

    cancel(){
      this.router.navigate(['/travel-package'])
    }

    AddTravelPackage(){
      this.dataService.AddTravelPackage(this.travelPackage).subscribe({
        next:(travelPackage) => {

          travelPackage.name = this.TravelPackageForm.value.name;
         travelPackage.description = this.TravelPackageForm.value.description;

         this.router.navigate(['/travel-package'])
        }
      })
    }
}


import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { TravelPackage } from 'src/app/shared/travelPackage';

@Component({
  selector: 'app-edit-travelpackage',
  templateUrl: './edit-travelpackage.component.html',
  styleUrls: ['./edit-travelpackage.component.scss']
})
export class EditTravelComponent implements OnInit {

  TravelPackageForm = new FormGroup(
    {
        name: new FormControl(''),
        description: new FormControl(''),
        price: new FormControl(0),
        date: new FormControl('')
    })

    travelPackage:any

    constructor(private dataService: DataService, private router: Router, private route:ActivatedRoute) { }
  
    ngOnInit(): void {
      this.dataService.GetTravelPackage(+this.route.snapshot.params['id']).subscribe(result => {
        this.travelPackage = result
        this.TravelPackageForm.patchValue({
          name: this.travelPackage.name,
          description: this.travelPackage.description,
          price: this.travelPackage.price,
          date: this.travelPackage.date
        });
    })
    }
  
    cancel(){
      this.router.navigate(['/travel-package'])
    }

   /* onSubmit(){
      this.dataService.EditTravelPackage(this.travelPackage.travelPackageID, this.TravelPackageForm.value).subscribe(result => {
            this.router.navigate(['/travel-package'])
      })
    }*/

    onSubmit() {
      // Make sure the form is valid before proceeding
      if (this.TravelPackageForm.valid) {
        // Create a new TravelPackage object with the updated values
        const updatedTravelPackage: TravelPackage = {
          travelPackageID: this.travelPackage.travelPackageID, // Include the ID for updating
          name: this.TravelPackageForm.get('name')?.value ?? null,
          description: this.TravelPackageForm.get('description')?.value ?? null,
          price: this.TravelPackageForm.get('price')?.value ?? null,
          date: this.TravelPackageForm.get('date')?.value ?? null,
        };
        
        // Pass the updatedTravelPackage object for editing
        this.dataService.EditTravelPackage(updatedTravelPackage).subscribe(result => {
          this.router.navigate(['/travel-package']);
        });
      }
    }
    
}


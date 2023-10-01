//import { Component, OnInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';


@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss']
})
export class EditVehicleComponent implements OnInit{

  vType:any;
  vStatus:any;
  vehicle:any;

  vehicleForm = new FormGroup({
    vehicleName : new FormControl(''),
    registrationNumber : new FormControl(''),
    image: new FormControl(''),
    vehicleTypeID: new FormControl(0),
    vehicleStatusID: new FormControl(0),
    vehiclePrice: new FormControl(0)
    //vehiclePrice: new FormControl(this.vehicle?.vehiclePrice?.amount || 0)

  })



  constructor(
    private dataService: DataService,
    private router: Router,
    private route : ActivatedRoute
  ){}

  ngOnInit(): void {
    this.dataService.getVehicle(+this.route.snapshot.params['vehicleID']).subscribe(result =>
      {
        this.vehicle = result;
        this.vehicleForm.patchValue({
          vehicleName : this.vehicle.vehicleName,
          registrationNumber : this.vehicle.registrationNumber,
          vehicleTypeID: this.vehicle.vehicleTypeID,
          vehicleStatusID: this.vehicle.vehicleStatusID,
          image: this.vehicle.image,
          vehiclePrice: this.vehicle.vehiclePrice
          
          //vehiclePrice: this.vehicle.vehiclePrice?.amount
        })

      })
      
      this.dataService.getVehicleStatus().subscribe((result:any) => {
        this.vStatus = result;
      })
  
      this.dataService.getVehicleTypes().subscribe((result:any) => {
        this.vType = result;
      })
  }

  handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.vehicleForm.patchValue({
                image: e.target.result
            });
        };
        reader.readAsDataURL(file);
    }
}


  cancel(){
    this.router.navigate(['/vehicle'])
  }

  onSubmit(){
    this.dataService.UpdateVehicle(this.vehicle.vehicleID,
      this.vehicleForm.value).subscribe(result => {
        this.router.navigate(['/vehicle']);
      })
  }

}

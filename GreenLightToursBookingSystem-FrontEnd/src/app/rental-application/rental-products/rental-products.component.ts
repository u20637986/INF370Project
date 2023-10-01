import { Trailer } from 'src/app/shared/trailer';
import { DataService } from 'src/app/service/rentalDataService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vehicle } from 'src/app/shared/vehicle';
import { VehicleBase } from 'src/app/shared/vehicleBase';
import { VehicleStatus } from 'src/app/shared/VehicleStatus';
import { VehicleType } from 'src/app/shared/VehicleType';
import { VehiclePrice } from 'src/app/shared/vehiclePrice';
import { HelpParagraphService } from 'src/app/service/help-paragraph.service';

@Component({
  selector: 'app-rental-products',
  templateUrl: './rental-products.component.html',
  styleUrls: ['./rental-products.component.scss']
})
export class RentalProductsComponent  {
  files: File[] = [];
  trailers:Trailer[]=[];
  vehicles: Vehicle[]=[];
  trailerPage = 1;
  vehiclePage = 1;
  itemsPerPage = 3;
  constructor(private dataService: DataService, private router:Router, private helpService:HelpParagraphService){
    helpService.showBooking = false;
    helpService.showRental = true;
    helpService.showTravel = false;
  }

  ngOnInit(): void {
      this.getTrailers()
      console.log(this.trailers)
      this.getVehicles()
      console.log(this.vehicles)
      

    }

    // code below is for fetching all existing trailers
    getTrailers()
    {
      this.dataService.GetAllTrailers().subscribe(result=> {
        let trailerList: any[] = result
        trailerList.forEach((element)=> {
          this.trailers.push(element)
        });
      })
    }

    //code below is for fetching all existing vehicles
    getVehicles(){
    
      this.dataService.getVehicles().subscribe(result => {
        let vehicleList: any[] = result;
        vehicleList.forEach((element) => {
          let motor: Vehicle = element
  
          vehicleList.forEach((motor) => {
           
            motor.img = 'data:image/png;base64,' + motor.img
            
          })
  
          this.dataService.getVehicleStatus().subscribe(vehicleStatus => {
            let status: VehicleStatus[] = vehicleStatus
            let stat = status.find(stat => stat.vehicleStatusID === motor.vehicleStatusID);
            if(stat){
              motor.vehicleStatus = stat.name;
              //this.vehicle.push(motor);
            }
          });
  
          this.dataService.getVehicleTypes().subscribe(vehicleType => {
            let type: VehicleType[] = vehicleType
            let vTypes = type.find(vTypes => vTypes.vehicleTypeID === motor.vehicleTypeID);
            if(vTypes){
              motor.vehicleType = vTypes.name;
              this.vehicles.push(motor)
            }
          });
  
          /*this.dataService.getVehiclePrices(motor.vehiclePriceID).subscribe((vehiclePrice: VehiclePrice) => {
            motor.vehiclePriceDetails = vehiclePrice;
            this.vehicle.push(motor);
          });*/
  
          this.dataService.getVehiclePrices(motor.vehiclePriceID).subscribe((vehiclePrice : VehiclePrice) => {
            console.log('Vehicle Price:', vehiclePrice); 
            motor.vehiclePriceID = vehiclePrice.amount;
          })
          
        })
      })
    }

   
  rentNow(selectedTrailer: any) { 
    
    this.router.navigate(['/rental-application', selectedTrailer.trailerID, selectedTrailer.size, selectedTrailer.registrationNumber, selectedTrailer.rentalPrice, selectedTrailer.trailerType]);
  }

  rentCar(selectedVehicle: any) { 
    
    this.router.navigate(['/Vrental-application', selectedVehicle.vehicleID, selectedVehicle.vehicleName, selectedVehicle.registrationNumber, selectedVehicle.vehiclePriceID, selectedVehicle.vehicleType]);
  }
 
  goBack() {
    this.router.navigateByUrl('/');
  } 
}
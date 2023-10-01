import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/GLBSdataservice';
//import { VehicleBase } from '../shared/vehicleBase';
import { Vehicle } from '../shared/vehicle';
import { VehicleStatus } from '../shared/VehicleStatus';
import { VehicleType } from '../shared/VehicleType';
import { forkJoin } from 'rxjs';
import { VehiclePrice } from '../shared/vehiclePrice';
import { ModalService } from '../service/modal.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit{

  vehicle: Vehicle[] = [];
  constructor(private dataService: DataService , private modalService:ModalService){}

  ngOnInit(): void {
    this.getVehicles()
  }

  getVehicles(){
    
    this.dataService.getVehicles().subscribe(result => {
      let vehicleList: any[] = result;
      vehicleList.forEach((element) => {
        let motor: Vehicle = element

        vehicleList.forEach((motor) => {
          //let img = motor.img;
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
            this.vehicle.push(motor)
          }
        });

        /*this.dataService.getVehiclePrices(motor.vehiclePriceID).subscribe((vehiclePrice: VehiclePrice) => {
          motor.vehiclePriceDetails = vehiclePrice;
          this.vehicle.push(motor);
        });*/

        this.dataService.getVehiclePrices(motor.vehiclePriceID).subscribe((vehiclePrice : VehiclePrice) => {
          console.log('Vehicle Price:', vehiclePrice); 
          motor.vehiclePrice = vehiclePrice.amount;
        })
        
      })
    })
  }

  DeleteVehicle(VehicleID: number){
    this.dataService.hasActiveRentalApplicationsForVehicle(VehicleID).subscribe(
      (hasActiveRentalApplications: boolean) => {
        if (hasActiveRentalApplications) {
          // Alert the user that the trailer cannot be deleted due to active rental applications
          alert('This vehicle cannot be deleted because there are active rental applications.');
          this.modalService.openErrorModal('This vehicle cannot be deleted because it has active rental applications.');
        } else {
          // Confirm with the user before proceeding with the deletion
          if (confirm('Are you sure you want to delete this vehicle?')) {
            // If the user confirms, delete the vehicle
            this.dataService.DeleteVehicle(VehicleID).subscribe(
              (result) => {
                // Optionally, you can handle the deletion success, e.g., show a success message.
                console.log('Vehicle deleted successfully.');
                window.location.reload();
                this.getVehicles();
              },
              (error) => {
                // Handle the deletion error, e.g., show an error message.
                console.error('Error deleting vehicle:', error);
              }
            );
          }
        }
      },
      (error) => {
        // Handle the error when checking for active rental applications
        console.error('Error checking for active rental applications:', error);
      }
    );
  }
}


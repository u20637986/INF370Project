import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/GLBSdataservice';
//import { VehicleBase } from '../shared/vehicleBase';
import { Vehicle } from '../shared/vehicle';
import { VehicleStatus } from '../shared/VehicleStatus';
import { VehicleType } from '../shared/VehicleType';
import { forkJoin } from 'rxjs';
import { VehiclePrice } from '../shared/vehiclePrice';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit{

  vehicle: Vehicle[] = [];
  constructor(private dataService: DataService ){}

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

  DeleteVehicle(VehicleID: Number){
    this.dataService.DeleteVehicle(VehicleID).subscribe(result => {
      window.location.reload();
      });
    }

}


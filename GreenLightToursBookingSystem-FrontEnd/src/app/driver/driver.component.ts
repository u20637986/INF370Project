import { Driver } from './../shared/driver';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/GLBSdataservice';


@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  drivers:Driver[] = []

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.GetAllDrivers()
  }

  GetAllDrivers()
  {
    this.dataService.GetAllDrivers().subscribe(result => {
      let driverList:any[] = result
      driverList.forEach((element) => {
        this.drivers.push(element)
      });
    })
  }

  DeleteDriver(driverID: Number){
    this.dataService.DeleteDriver(driverID).subscribe(result => {
      window.location.reload();
      });
    }
  
}


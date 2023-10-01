import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { Driver } from 'src/app/shared/driver';


@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.scss']
})
export class AddDriverComponent implements OnInit {

  drivers: Driver = {
   driverID:0,
    licenseCode: ''
  };

  DriverForm = new FormGroup(
    {
        licenseCode: new FormControl('')
    })

    constructor(private dataService: DataService, private router: Router) { }

    ngOnInit(): void {
    }

    cancel(){
      this.router.navigate(['/driver'])
    }
    AddDriver(){
      this.dataService.AddDriver(this.drivers).subscribe({
        next:(drivers) => {

         drivers.licenseCode = this.DriverForm.value.licenseCode;


         this.router.navigate(['/driver'])
        }
      })
    }


  }






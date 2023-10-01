import { Component , OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { ServiceEntity } from 'src/app/shared/serviceentity';


@Component({
  selector: 'app-add-service-entity',
  templateUrl: './add-service-entity.component.html',
  styleUrls: ['./add-service-entity.component.scss']
})
export class AddServiceEntityComponent  implements OnInit {

  service: ServiceEntity = {
    serviceID:0,
    name: ''
  };

  ServiceForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required])
    })

    constructor(private dataService: DataService, private router: Router) { }

    ngOnInit(): void {
    }

    getErrorMessage(controlName: string) {
      const control = this.ServiceForm.get(controlName);
  
      if (!control) {
        return ''; // Return an empty string if the control is not found
      }
  
      if (control.hasError('required')) {
        return 'This field is required';
      }
  
      return '';
    }

    cancel(){
      this.router.navigate(['/service-entity'])
    }
    AddService(){
      this.dataService.AddService(this.service).subscribe({
        next:(service) => {

          service.name = this.ServiceForm.value.name;

         this.router.navigate(['/service-entity'])
        }
      })
    }


  }

import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { DataService } from 'src/app/service/GLBSdataservice';
import { ServiceEntity } from 'src/app/shared/serviceentity';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-update-service-entity',
  templateUrl: './update-service-entity.component.html',
  styleUrls: ['./update-service-entity.component.scss']
})
export class UpdateServiceEntityComponent {


   service : ServiceEntity  = {
    serviceID: 0,
    name: ''
  };

  constructor(
    private dataservice: DataService,
    private activated:ActivatedRoute,
    private router: Router,
  ) {}

  editService: ServiceEntity = new ServiceEntity();
  
    updateServiceForm: FormGroup = new FormGroup({
      name: new FormControl('',[Validators.required])
      
    })

    ngOnInit(): void {
      
      // GET THE ID FROM THE URL 
    this.activated.params.subscribe(params => { 
 
     //SEND OFF REQUEST TO DB TO FIND OBJECT DATA 
     this.dataservice.getService(this.dataservice.getSelectedService()).subscribe(response => { //SUBSCRIBE TO THE RESPONSE

      //MAP THE RESPONSE TP THE CURRENT EDITCOURSE OBJECT
      this.editService = response as ServiceEntity;
 
      //MAP THE RESPONSE VALUES TO THE FORM 
      this.updateServiceForm.controls['name'].setValue(this.editService.name);
      
     // this.updateTravelPackageForm.controls['customFile'].setValue(this.editTravelPackage.imageBase64);
     
     })
 
    })
     }
    
     UpdateServices()
     {
     
 if(this.updateServiceForm.valid)
 {
 
   this.service.serviceID = this.editService.serviceID;
   this.service.name = this.updateServiceForm.value.name;
  
 
  this.dataservice.UpdateService(this.editService.serviceID,this.service).subscribe((response:any) => {
 
   if(response.statusCode == 200)
   {
   
     this.router.navigate(['/service-entity'])
     
   }
   else
   {
     console.log(response.message);
     this.router.navigate(['/service-entity'])
   }
  });
 }
      
   
     }
   
   cancel() {
     this.router.navigate(['/service-entity']);
   }

   getErrorMessage(controlName: string) {
    const control = this.updateServiceForm.get(controlName);

    if (!control) {
      return ''; // Return an empty string if the control is not found
    }

    if (control.hasError('required')) {
      return 'This field is required';
    }

    return '';
  }
  }
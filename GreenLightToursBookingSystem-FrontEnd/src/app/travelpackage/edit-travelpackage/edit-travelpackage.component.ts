import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { DataService } from 'src/app/service/GLBSdataservice';
import { TravelPackage } from 'src/app/shared/TravelPackage';
import { OnInit } from '@angular/core';
import { TravelPackageStatus } from 'src/app/shared/travelPackageStatus';


@Component({
  selector: 'app-edit-travelpackage',
  templateUrl: './edit-travelpackage.component.html',
  styleUrls: ['./edit-travelpackage.component.scss']
})
export class EditTravelComponent implements OnInit {

  base64!:string;

  travelPackageStatuses:TravelPackageStatus[]=[]

  travelPackage: TravelPackage = {
    travelPackageID: 0,
    name: '',
    description: '',
    price: 0,
    date: '',
    imageBase64: '',
    travelPackageStatusID: 0
  };
  
    constructor(
      private dataservice: DataService, // Use the correct service name here
      //private route: ActivatedRoute,
      private activated:ActivatedRoute,
      private router: Router,
     // private FormBuilder: FormBuilder
    ) {}
  
    //editTravelPackage: TravelPackage | null = null;
    editTravelPackage: TravelPackage = new TravelPackage();
  
    updateTravelPackageForm: FormGroup = new FormGroup({
      name: new FormControl('',[Validators.required]),
      description: new FormControl('',[Validators.required]),
      price: new FormControl('',[Validators.required]),
      date: new FormControl('',[Validators.required]),
      travelPackageStatusID: new FormControl('',[Validators.required]),

     // imageBase64: new FormControl('',[Validators.required])
    })
  
    ngOnInit(): void {
  
      
       // GET THE ID FROM THE URL 
     this.activated.params.subscribe(params => { 
  
  
      //SEND OFF REQUEST TO DB TO FIND OBJECT DATA 
      this.dataservice.GetTravelPackage(this.dataservice.getSelectedTravelPackage()).subscribe(response => { //SUBSCRIBE TO THE RESPONSE
  
       //MAP THE RESPONSE TP THE CURRENT EDITCOURSE OBJECT
       this.editTravelPackage = response as TravelPackage;
  
       //MAP THE RESPONSE VALUES TO THE FORM 
       this.updateTravelPackageForm.controls['name'].setValue(this.editTravelPackage.name);
       this.updateTravelPackageForm.controls['description'].setValue(this.editTravelPackage.description);
       this.updateTravelPackageForm.controls['price'].setValue(this.editTravelPackage.price);
       this.updateTravelPackageForm.controls['date'].setValue(this.editTravelPackage.date);
       this.updateTravelPackageForm.controls['travelPackageStatusID'].setValue(this.editTravelPackage.travelPackageStatusID);

      // this.updateTravelPackageForm.controls['customFile'].setValue(this.editTravelPackage.imageBase64);
  
      this.dataservice.GetAllTravelPackageStatus().subscribe(result => {
       this.travelPackageStatuses = result
      })
      
      })
  
     })
      }
     
      UpdateTravelPackages()
      {
      
  if(this.updateTravelPackageForm.valid)
  {
  
    this.travelPackage.travelPackageID = this.editTravelPackage.travelPackageID;
    this.travelPackage.name = this.updateTravelPackageForm.value.name;
    this.travelPackage.description = this.updateTravelPackageForm.value.description;
    this.travelPackage.date = this.updateTravelPackageForm.value.date;
    this.travelPackage.price = this.updateTravelPackageForm.value.price;
    this.travelPackage.imageBase64 =  this.base64;
    this.travelPackage.travelPackageStatusID = this.updateTravelPackageForm.value.travelPackageStatusID;
  
    console.log(this.travelPackage);
  
   this.dataservice.EditTravelPackage(this.editTravelPackage.travelPackageID,this.travelPackage).subscribe((response:any) => {
  
    if(response.statusCode == 200)
    {
    
      this.router.navigate(['/travelpackage'])
      
    }
    else
    {
      console.log(response.message);
      this.router.navigate(['/travelpackage'])
    }
   });
  }
       
    
      }
    
    cancel() {
      this.router.navigate(['/travelpackage']);
    }
    getErrorMessage(controlName: string) {
      const control = this.updateTravelPackageForm.get(controlName);
  
      if (!control) {
        return ''; // Return an empty string if the control is not found
      }
  
      if (control.hasError('required')) {
        return 'This field is required';
      }
  
      if (controlName === 'price') {
        if (control.hasError('pattern') || control.hasError('required')) {
          return 'Enter a valid price (e.g., 100 or 100.00)';
        }
        // Add additional error checks for price if needed
      }
  
      return '';
    }
    
    // onFileSelected(event: any)
    //   {
  
    //     this.convertFile(event!.target!.files[0]!).subscribe((base64: any) => {
    //      this.base64 = base64;
    //      console.log(this.base64)
    //     });
  
    //   }

    onFileSelected(event: any) {
      const file = event.target.files[0];
      if (file) {
        const allowedExtensions = ['.jpg', '.jpeg'];
        const fileExtension = file.name.split('.').pop()?.toLowerCase() || '';
    
        if (allowedExtensions.indexOf('.' + fileExtension) === -1) {
          // Invalid file type
          alert('Please select a valid JPEG image file.');
          return;
        }
    
        this.convertFile(file).subscribe((base64: any) => {
          this.base64 = base64;
          console.log(this.base64);
        });
      }
    }

   nonNegativeValidator(control: FormControl) {
    const value = parseFloat(control.value);

    if (!isNaN(value) && value < 0) {
      return { negativeValue: true };
    }

    return null; // Valid
  }
    
    convertFile(file : File) : Observable<string> {
      
      const result = new ReplaySubject<string>(1);
      const reader = new FileReader();
      reader.readAsBinaryString(file);
      reader.onload = (event) => result.next(btoa(event.target!.result!.toString()));
      return result;
    }
}


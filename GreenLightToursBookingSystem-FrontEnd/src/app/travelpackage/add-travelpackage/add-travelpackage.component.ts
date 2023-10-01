import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { TravelPackage } from 'src/app/shared/travelPackage';
import { Observable, ReplaySubject } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-travelpackage',
  templateUrl: './add-travelpackage.component.html',
  styleUrls: ['./add-travelpackage.component.scss']
})
export class AddTravelPackageComponent {
  travelPackage: TravelPackage = {
    travelPackageID: 0,
    name: '',
    description: '',
    price: 0,
    date: '',
    imageBase64: '',
    travelPackageStatusID: 0
  };

  TravelPackageForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required] ),
      price: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required])
    })

    constructor(private dataService: DataService, private router: Router) { }

    ngOnInit(): void {
    }

    cancel(){
      this.router.navigate(['/travel-package'])
    }

    getErrorMessage(controlName: string) {
      const control = this.TravelPackageForm.get(controlName);
  
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

        if (control.hasError('negativeValue')) {
          return 'Price cannot be negative';
        }
      
      }

      
  
      return '';
    }

    AddTravelPackage(){
      this.dataService.AddTravelPackage(this.travelPackage).subscribe({
        next:(travelPackage) => {

          travelPackage.name = this.TravelPackageForm.value.name;
         travelPackage.description = this.TravelPackageForm.value.description;
         travelPackage.price = this.TravelPackageForm.value.price;
         travelPackage.date = this.TravelPackageForm.value.date;
         travelPackage.travelPackageStatusID = 0;

         this.router.navigate(['/travelpackage'])
        }
      })
    }

    // onFileSelected(event: any)
    // {
    //   this.convertFile(event!.target!.files[0]!).subscribe(base64 => {
    //    this.travelPackage.imageBase64 = base64;
    //   });

    // }

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
    
        this.convertFile(file).subscribe((base64) => {
          this.travelPackage.imageBase64 = base64;
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


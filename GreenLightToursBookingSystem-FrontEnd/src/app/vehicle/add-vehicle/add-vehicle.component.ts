import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { VehicleBase } from 'src/app/shared/vehicleBase';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.scss']
})
export class AddVehicleComponent implements OnInit{

  /*vehicleForm!: FormGroup;
  imageFileName: any;
  vStatus : any;
  vType: any;
  imageURL: any;
  constructor(
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private route: Router
  ){}

  ngOnInit(): void {
    this.vehicleForm = this.formBuilder.group({
      vehicleName:['', Validators.required],
      registrationNumber:['', Validators.required],
      vehicleType:[0, Validators.required],
      vehicleStatus:[0, Validators.required],
      image: ''
    });

    this.dataService.getVehicleStatus().subscribe((result : any) =>{
      this.vStatus = result;
    })

    this.dataService.getVehicleTypes().subscribe((result : any) =>{
      this.vType = result;
    })
    
  }

  addVehicle():void {
    this.dataService.AddVehicle(this.vehicleForm.value).subscribe(() => {
      this.route.navigate(['vehicle']);
    })
  }

  select(e: any) {
    const file = e.target.files[0];
    const fileType = file.type;
  
    if (fileType.match(/image\/.*$/)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        const base64Image = event.target.result;
        const fileName = file.name;
  
        this.imageURL = `data:${fileType};base64,${base64Image}`;
        this.imageFileName = fileName; 
  
        console.log(this.imageFileName);
      };
    } else {
      window.alert('Incorrect image format');
    }
  } */


  vehicleForm!: FormGroup;
  imageFileName: any;
  vStatus : any;
  vType: any;
  imageURL: any;
  selectedImage: any;
  imageBase64: string | null = null;

  constructor(
    private dataService: DataService,
    public formBuilder: FormBuilder,
    private route: Router
  ){
    this.vehicleForm = formBuilder.group({
      vehicleName:['', Validators.required],
      registrationNumber:['', Validators.required],
      vehicleTypeID:[0, Validators.required],
      vehicleStatusID:[0, Validators.required],
      image: '',
      vehiclePriceID: [0, Validators.required]
    })

    
    this.dataService.getVehicleStatus().subscribe((result:any) => {
      this.vStatus = result;
    })

    dataService.getVehicleTypes().subscribe((result:any) => {
      this.vType = result;
    })
  }
  ngOnInit(): void {
    
  }

  addVehicle(){
    if(this.vehicleForm.valid){
      const vehicle = { 
      vehicleName: this.vehicleForm.value.vehicleName,
      registrationNumber: this.vehicleForm.value.registrationNumber,
      vehicleTypeID: this.vehicleForm.value.vehicleTypeID,
      vehicleStatusID: this.vehicleForm.value.vehicleStatusID,
      image: this.imageBase64,
      vehiclePriceID: this.vehicleForm.value.vehiclePriceID
      };

      this.dataService.AddVehicle(vehicle).subscribe(()=>{this.route.navigate(['vehicle'])});
      console.log(vehicle);
    }
  }

  /*addVehicle() {
    if (this.vehicleForm.valid && this.imageBase64) {
      //const blob = this.convertToBase64(this.imageBase64)

      const vehicleData = new FormData();
      vehicleData.append('vehicleName', this.vehicleForm.value.vehicleName);
      vehicleData.append('registrationNumber', this.vehicleForm.value.registrationNumber);
      vehicleData.append('vehicleTypeID', this.vehicleForm.value.vehicleTypeID);
      vehicleData.append('vehicleStatusID', this.vehicleForm.value.vehicleStatusID);
      vehicleData.append('image', this.imageBase64); // Add the base64 image here
  
      this.dataService.AddVehicle(vehicleData).subscribe(() => {
        this.route.navigate(['vehicle']);
      });
    }
  }*/
  


 

  handleImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file);
    }
    console.log('Base64 Image:', this.imageBase64);
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageBase64 = event.target.result;
    };
    reader.readAsDataURL(file);
  }

  saveImage(): void {
    if (this.imageBase64) {
      // Here you can send the base64 string to your API to save it to the database.
      console.log('Base64 Image:', this.imageBase64);
    }
  }

  /*handleImageUpload(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.convertToBase64(file);
    }
  }
  
  convertToBase64(file: File): void {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageBase64 = event.target.result;
      this.vehicleForm.patchValue({ image: event.target.result }); // Update the form value
    };
    reader.readAsDataURL(file);
  }*/
  

  
  /*select(e: any) {
    /const file = e.target.files[0];
    const fileType = file.type;
  
    if (fileType.match(/image\/.*$/)) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event: any) => {
        const base64Image = event.target.result;
        const fileName = file.name;
  
        this.imageURL = `data:${fileType};base64,${base64Image}`;
        this.imageFileName = fileName; 
  
        console.log(this.imageFileName);
      };
    } else {
      window.alert('Incorrect image format');
    }*
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.selectedImage = reader.result;
  
      }
    }
  }*/

  /*select(e: any) {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.selectedImage = reader.result;
        // Save the selected image in the form control 'image'
        this.vehicleForm.patchValue({
          image: this.selectedImage,
        });
      };
    }
  }*/

  /*select(e: any) {
    const file = e.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        const base64Image = reader.result as string;
        this.selectedImage = base64Image;
        // Save the Base64-encoded image data in the img property
        this.vehicleForm.patchValue({
          image: base64Image.split(',')[1], // Only store the Base64 data without the data:image/png;base64, prefix
        });
      };
    }
  }*/

  select(event: any) {
    if (event.target.files) {
      for (var i = 0; i < File.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);

        reader.onload = (event: any) => {
          this.imageURL = event.target.result;
        }
      }
    }
  }
  
  
}

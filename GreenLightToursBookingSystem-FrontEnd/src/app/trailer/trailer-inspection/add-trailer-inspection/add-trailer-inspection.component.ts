import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/trailer.service';
import { TrailerStatus } from 'src/app/shared/trailerstatus';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-add-trailer-inspection',
  templateUrl: './add-trailer-inspection.component.html',
  styleUrls: ['./add-trailer-inspection.component.scss']
})
export class AddTrailerInspectionComponent {

  inspectionForm!:FormGroup;
  trailerID!:number;
  registrationNumber!: string;
  checkInOut!: string;
  passOrFail!: string;
conductedBy!:string;
  trailerStatusID:any;
  trailerStatuses:TrailerStatus[]=[];
  paint!:boolean;
  tyres !:boolean;
 hitch!:boolean;
 brakes !:boolean;
 lights !:boolean;
 liscensePlate !:boolean;
 interiorFloor !:boolean;
 testDrive !:boolean;
 date!:Date;



constructor(private dataService: DataService, 
  private router: Router, 
  private fb:FormBuilder, 
  private route: ActivatedRoute,
  private snackBar:MatSnackBar){}

ngOnInit():void{
  this.getStatusesFromAPI();
  this.buildForm();
  this.trailerID = +this.route.snapshot.params['trailerID'];
  //this.userID =+localStorage.getItem('userId')!;
  
}
private getStatusesFromAPI() {
  this.dataService.getTrailerStatuses().subscribe((result: any) => {
    let response = result as TrailerStatus[];
    this.trailerStatuses = response;
  });
}

  private buildForm() {
    this.inspectionForm = this.fb.group({
      paint: [false, Validators.required],
      checkInOut: ['', Validators.required],
      passOrFail: ['', Validators.required],
      tyres: [false, Validators.required],
      hitch: [false, Validators.required],
      brakes: [false, Validators.required],
      lights: [false, Validators.required],
      trailerStatusID: [0, Validators.required],
      liscensePlate: [false, Validators.required], 
      interiorFloor: [false, Validators.required],
      testDrive: [false, Validators.required],
      floorBase: [false, Validators.required],
      date: ['', Validators.required],
      conductedBy:['Admin',Validators.required]
        });
      }

onSubmit():void{
    // Set the inspection date to the current system date
    const currentDate = new Date();
   // const thisUser=this.userID;
    this.inspectionForm.patchValue({
      date: currentDate,
     // userID:thisUser
    });
  
  const inspection={
    paint:this.inspectionForm.value.paint,
    checkInOut:this.inspectionForm.value.checkInOut,
    passOrFail:this.inspectionForm.value.passOrFail,
    tyres:this.inspectionForm.value.tyres,
    hitch:this.inspectionForm.value.hitch,
    brakes:this.inspectionForm.value.brakes,
    lights:this.inspectionForm.value.lights,
    trailerStatusID:this.inspectionForm.value.trailerStatusID,
    liscensePlate:this.inspectionForm.value.liscensePlate,
    interiorFloor:this.inspectionForm.value.interiorFloor,
    testDrive:this.inspectionForm.value.testDrive,
    floorBase:this.inspectionForm.value.floorBase,
    date: this.inspectionForm.value.date,
    conductedBy:this.inspectionForm.value.conductedBy
  };

/*const existingUser=this.users.find(
  (user)=>user.name===this.inspectionForm.value.userName
);*/

  this.dataService.addInspection(this.trailerID, inspection).subscribe(()=>{
    
    this.showSnackbar(`Trailer Inspection added successfully`, 'success-snackbar');
    this.router.navigate(['/trailer-inspection']);
  },
  (error) => {
    // Handle the error response here, if needed
    this.showSnackbar(`Trailer Inspection could not be added`, 'error-snackbar');
    console.error('Error adding trailer inspection:', error);
  })
}

showSnackbar(message: string, panelClass: string) {
  this.snackBar.open(message, 'Close', {
    duration: 6000,
    panelClass: [panelClass],
  });
};

cancel() {
  this.inspectionForm.reset();
  this.router.navigate(['/trailer-inspection']);
} 

setPass() {
  this.inspectionForm.patchValue({
    passOrFail: 'pass'
    
  });
  console.log(this.inspectionForm);
  this.onSubmit()
}

setFail() {
  this.inspectionForm.patchValue({
    passOrFail: 'fail'
  });
  console.log(this.inspectionForm);
  this.onSubmit()
}
    }
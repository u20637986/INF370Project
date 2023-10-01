import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';

@Component({
  selector: 'app-add-inspection',
  templateUrl: './add-inspection.component.html',
  styleUrls: ['./add-inspection.component.scss'],
})
export class AddInspectionComponent implements OnInit{

  //inspectForm!: FormGroup;
  vehicleStat:any;
  status: string = '';

  inspectForm: FormGroup;

  constructor(
    private dataService: DataService,
    public formBuilder: FormBuilder,
    private route: Router
  ){
    this.inspectForm = formBuilder.group({
      registrationNumber: ['', Validators.required],
      checkInOut: ['', Validators.required],
      vehicleStatusID: [0, Validators.required],
      result: ['', Validators.required],
      date: Date,
    })

    this.dataService.getVehicleStatus().subscribe((result:any) => {
      this.vehicleStat = result;
    })
  }
  ngOnInit(): void {
    
  }

  addInspection(){
    if(this.inspectForm.valid){
      const inspection = {
      registrationNumber: this.inspectForm.value.registrationNumber,
      checkInOut: this.inspectForm.value.checkInOut,
      vehicleStatusID: this.inspectForm.value.vehicleStatusID,
      result: this.status,
      date: new Date()

      };

      this.dataService.AddInspection(inspection).subscribe(()=>{this.route.navigate(['inspection'])})
    }
  }


  updateStatus() {
    const paint = (document.querySelector('input[value="Paint"]') as HTMLInputElement).checked;
    const windows = (document.querySelector('input[value="Windows"]') as HTMLInputElement).checked;
    const mirrors = (document.querySelector('input[value="Mirrors"]') as HTMLInputElement).checked;
    const tyres = (document.querySelector('input[value="Tyres"]') as HTMLInputElement).checked;
    const wipers = (document.querySelector('input[value="Wipers"]') as HTMLInputElement).checked;
    const license = (document.querySelector('input[value="License"]') as HTMLInputElement).checked;
    const lights = (document.querySelector('input[value="Lights"]') as HTMLInputElement).checked;
    const dashboard = (document.querySelector('input[value="Dashboard"]') as HTMLInputElement).checked;
    const seats = (document.querySelector('input[value="Seats"]') as HTMLInputElement).checked;
    const controls = (document.querySelector('input[value="Controls"]') as HTMLInputElement).checked;
    const aircon = (document.querySelector('input[value="Aircon"]') as HTMLInputElement).checked;
    const entertainment = (document.querySelector('input[value="Entertainment"]') as HTMLInputElement).checked;
    const pedals = (document.querySelector('input[value="Pedals"]') as HTMLInputElement).checked;
    const emergency = (document.querySelector('input[value="Emergency"]') as HTMLInputElement).checked;
    

    if (paint && windows && mirrors && tyres && wipers && license && lights && dashboard && seats 
      && controls && aircon && entertainment && pedals && emergency) {
      this.status = 'Pass';
    } else {
      this.status = 'Fail';
    }
  }

  /*updateStatus() {
    const windowsChecked = this.inspectForm.get('Windows')?.value;
    const paintChecked = this.inspectForm.get('Paint')?.value;
    const matChecked = this.inspectForm.get('Mat')?.value;
  
    const allChecked = windowsChecked && paintChecked && matChecked;
    this.status = allChecked ? 'Pass' : 'Fail';
  }*/
  

  /*checkboxes: { label: string; checked: boolean }[] = [
    { label: 'Windows', checked: false },
    { label: 'Pain', checked: false },
    { label: 'Mat', checked: false }
  ];

  status: string = '';

  updateStatus() {
    const allChecked = this.checkboxes.every(checkbox => checkbox.checked);
    this.status = allChecked ? 'Pass' : 'Fail';
  }*/

  
  /*vehicleStat:any;

  constructor(private dataService: DataService, private formBuilder: FormBuilder, private route:Router){}

  ngOnInit(): void {
    this.inspectForm = this.formBuilder.group({
      registrationNumber: ['', Validators.required],
      type: ['', Validators.required],
      checkInOut: ['', Validators.required],
      vehicleStatus: [0, Validators.required],
      passOrFail: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.dataService.getVehicleStatus().subscribe((result:any) => {
      this.vehicleStat = result;
    })
  }

  addInspection(){
    this.dataService.AddInspection(this.inspectForm.value).subscribe(() => {
      this.route.navigate(['/inspection']);
    })
  }*/

}

import { Component , OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { TripType } from 'src/app/shared/trip-type';


@Component({
  selector: 'app-add-trip-type',
  templateUrl: './add-trip-type.component.html',
  styleUrls: ['./add-trip-type.component.scss']
})
export class AddTripTypeComponent implements OnInit {

  TripTypeForm!: FormGroup;

    constructor(private dataService: DataService, private router: Router, public fbBuilder: FormBuilder){
      this.TripTypeForm = fbBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required]
      })
    }

    ngOnInit(): void {
    }

    cancel(){
      this.router.navigate(['/trip-type'])
    }

    AddTripType(){
      if(this.TripTypeForm.valid){
        const triptype = {
          name: this.TripTypeForm.value.name,
          description: this.TripTypeForm.value.description,
        };

        this.dataService.AddTripType(triptype).subscribe(()=>{
          this.router.navigate(['/trip-type'])
        })
      }
    }

  }

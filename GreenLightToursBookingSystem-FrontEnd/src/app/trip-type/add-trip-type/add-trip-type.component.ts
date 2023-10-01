import { Component , OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { TripType } from 'src/app/shared/trip-type';


@Component({
  selector: 'app-add-trip-type',
  templateUrl: './add-trip-type.component.html',
  styleUrls: ['./add-trip-type.component.scss']
})
export class AddTripTypeComponent implements OnInit {

  tripType: TripType = {
    tripTypeID:0,
    name: '',
    description:''
  };

  TripTypeForm = new FormGroup(
    {
        name: new FormControl(''),
        description: new FormControl('')
    })

    constructor(private dataService: DataService, private router: Router) { }

    ngOnInit(): void {
    }

    cancel(){
      this.router.navigate(['/trip-type'])
    }
    AddTripType(){
      this.dataService.AddTripType(this.tripType).subscribe({
        next:(tripType) => {

          tripType.name = this.TripTypeForm.value.name;
          tripType.description = this.TripTypeForm.value.description;

         this.router.navigate(['/trip-type'])
        }
      })
    }


  }

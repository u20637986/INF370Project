import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { Quotation } from 'src/app/shared/Quotation';

@Component({
  selector: 'app-add-quotation',
  templateUrl: './add-quotation.component.html',
  styleUrls: ['./add-quotation.component.scss']
})
export class AddQuotationComponent implements OnInit {

  quotation: Quotation = {

    QuotationID:0,
    name:'',
    description:'',
    date:'',
    amount:0,
    quantity:0
  }

  QuotationForm = new FormGroup(
    {

        name: new FormControl('',  [Validators.required]),
        description: new FormControl('',  [Validators.required]),
        date: new FormControl('',  [Validators.required]),
        amount: new FormControl(0,  [Validators.required]),
        quantity: new FormControl(0,  [Validators.required])

    })

    constructor(private dataService: DataService, private router: Router) { }

    ngOnInit(): void {
    }

    cancel(){
      this.router.navigate(['/quotation'])
    }
   

    getErrorMessage(controlName: string) {
      const control = this.QuotationForm.get(controlName);
  
      if (!control) {
        return ''; // Return an empty string if the control is not found
      }
  
      if (control.hasError('required')) {
        return 'This field is required';
      }
  
      if (controlName === 'amount') {
        if (control.hasError('pattern')) {
          return 'Enter a valid amount';
        }
      }
  
      if (controlName === 'quantity') {
        if (control.hasError('pattern')) {
          return 'Enter a valid quantity';
        }
      }
  
      return '';
    }

    AddQuotation(){
      this.dataService.AddQuotation(this.quotation).subscribe({
        next:(quotation) => {

          quotation.name = this.QuotationForm.value.name;
          quotation.description = this.QuotationForm.value.description;
          quotation.date = this.QuotationForm.value.date;
          quotation.amount = this.QuotationForm.value.amount;
          quotation.quantity = this.QuotationForm.value.quantity;

         this.router.navigate(['/quotation'])
        }
      })
    }
}

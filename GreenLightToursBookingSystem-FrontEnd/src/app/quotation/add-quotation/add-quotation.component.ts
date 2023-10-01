import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

        name: new FormControl(''),
        description: new FormControl(''),
        date: new FormControl(''),
        amount: new FormControl(''),
        quantity: new FormControl('')

    })

    constructor(private dataService: DataService, private router: Router) { }

    ngOnInit(): void {
    }

    cancel(){
      this.router.navigate(['/quotation'])
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

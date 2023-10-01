import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { Refund } from 'src/app/shared/Refund';

@Component({
  selector: 'app-add-refund',
  templateUrl: './add-refund.component.html',
  styleUrls: ['./add-refund.component.scss']
})
export class AddRefundComponent {
  display = "none";
  refunds:Refund[]=[]


  refund: Refund = {

    RefundID:0,
    name:'',
    amount:0,
    date:''
  }

  RefundForm = new FormGroup(
    {

        name: new FormControl('' ,  [Validators.required]),
        amount: new FormControl(0 ,  [Validators.required]),
        date: new FormControl('' ,  [Validators.required])

    })

    constructor(private dataService: DataService, private router: Router) { }

    ngOnInit(): void {
    }

    return(){
      this.router.navigate(['/refund'])
    }

    getTodayDate(): string {
      const today = new Date();
      const isoDate = today.toISOString().split('T')[0];
      return isoDate;
    }
    
    openModal() {
      this.display = "block";
    }

    onCloseHandled() {
      this.display = "none";

    }

    getErrorMessage(controlName: string) {
      const control = this.RefundForm.get(controlName);
  
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
  
          return '';
    }

    AddRefund(){
      this.dataService.AddRefund(this.refund).subscribe({
        next:(refund) => {

          refund.name = this.RefundForm.value.name;
          refund.amount = this.RefundForm.value.amount;
          refund.date = this.RefundForm.value.date;

        //    this.openModal(); 
        //  this.router.navigate(['/refund'])
        }
      })
    }

    
}

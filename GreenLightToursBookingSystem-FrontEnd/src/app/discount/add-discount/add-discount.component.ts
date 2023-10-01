import { Component , OnInit} from '@angular/core';
import { Discount } from 'src/app/shared/discount';
import { DataService } from 'src/app/service/GLBSdataservice';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBarRef, MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit{
  
  constructor(private data:DataService, private router : Router, private snackBar: MatSnackBar) { }

  //Creating the form 

  DiscountForm: FormGroup = new FormGroup({
    amount: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
  }
  addDiscount()
  {

    if (this.DiscountForm.valid)
    {
        
   let discount = new Discount();
  
   discount.amount = this.DiscountForm.value.amount;
   discount.date = this.DiscountForm.value.date;
   
  this.data.AddDiscount(discount).subscribe((response:any) => {

   if(response.statusCode == 200)
   {
     this.router.navigate(['/discount'])
   }
   else
   {
     //alert("The discount has been added");
     const snackBarRef: MatSnackBarRef<any> = this.snackBar.open('The discount has been added successfully ', 'X', { duration: 3000 , verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      location.reload();
    });
     this.router.navigate(['/discount'])
   }
  });
    }

  else
  {
    const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(' Please check that both the Amount field and Date fields are entered!', 'X', { duration: 5000 , verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      location.reload();
    });
    

  }

  }

  

  

}
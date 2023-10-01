import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/GLBSdataservice';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Discount } from 'src/app/shared/discount';

@Component({
  selector: 'app-edit-discount',
  templateUrl: './edit-discount.component.html',
  styleUrls: ['./edit-discount.component.scss']
})
export class EditDiscountComponent implements OnInit{

  constructor(private data:DataService, private router : Router , private activated:ActivatedRoute) { }

  //Creating the form 
  editDiscount: Discount = new Discount();

  updateDiscountForm: FormGroup = new FormGroup({
    amount: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {

    // GET THE ID FROM THE URL 
   this.activated.params.subscribe(params => { 


    //SEND OFF REQUEST TO DB TO FIND OBJECT DATA 
    this.data.GetDiscountById(params['DiscountID']).subscribe(response => { //SUBSCRIBE TO THE RESPONSE

     //MAP THE RESPONSE TP THE CURRENT EDITCOURSE OBJECT
     this.editDiscount = response as Discount;

     //MAP THE RESPONSE VALUES TO THE FORM 
     this.updateDiscountForm.controls['amount'].setValue(this.editDiscount.amount);
     this.updateDiscountForm.controls['date'].setValue(this.editDiscount.date);
    
    })

   })
}

UpdateDiscount()
  {
    let discount = new Discount();
    discount.amount = this.updateDiscountForm.value.amount;
    discount.date = this.updateDiscountForm.value.date;
    

   this.data.EditDiscount(this.editDiscount.discountID,discount).subscribe((response:any) => {

    if(response.statusCode == 200)
    {
    
      this.router.navigate(['/discount'])
      
    }
    else
    {
      console.log(response.message);
      this.router.navigate(['/discount'])
    }
   });

  }

}

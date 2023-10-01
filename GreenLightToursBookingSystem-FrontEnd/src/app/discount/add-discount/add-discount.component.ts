import { Component , OnInit} from '@angular/core';
import { Discount } from 'src/app/shared/discount';
import { DataService } from 'src/app/service/GLBSdataservice';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit{
  
  constructor(private data:DataService, private router : Router) { }

  //Creating the form 

  DiscountForm: FormGroup = new FormGroup({
    amount: new FormControl('',[Validators.required]),
    date: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {
  }
  addDiscount()
  {
    
   let discount = new Discount();
  
    discount.amount = this.DiscountForm.value.amount;
    discount.date = this.DiscountForm.value.date;
    
   this.data.AddDiscount(discount).subscribe((response:any) => {

    if(response.statusCode == 200)
    {
      this.router.navigate(['/'])
    }
    else
    {
      alert("The discount has been added");
      this.router.navigate(['/'])
    }
   });

  }

}
import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Discount } from '../shared/discount';
import { DataService } from '../service/GLBSdataservice';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {
  Discount:Discount[] = []

  
  constructor(private GLBSdataservice:DataService, private router:Router) { }

  
  ngOnInit(): void {
    this.GetAllDiscounts()
  }

  GetAllDiscounts(){
    this.GLBSdataservice.GetAllDiscounts().subscribe(res => {
      this.Discount = res as Discount[];
  });
  }

  EditDiscount(DiscountID:Number)
  {
    this.router.navigate(['/edit-discount',DiscountID]);
  }

  DeleteDiscount(DiscountID:Number)
  {
    this.GLBSdataservice.DeleteDiscount(DiscountID).subscribe((response:any) => {
      if(response.statusCode == 200)
      {
        this.GetAllDiscounts();
      }
      else
      {
        //alert(response.message)
        alert("The discount has been deleted.")
        this.GetAllDiscounts();
      }
    })
  }

}

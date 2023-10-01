import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Discount } from '../shared/discount';
import { DataService } from '../service/GLBSdataservice';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBarRef, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  dataSource = new MatTableDataSource<Discount>();
  //dataSource = new MatTableDataSource<Discount>
  Discount:Discount[] = []
  searchedDiscounts:Discount[]=[]
  discounts:Discount[]=[]
  

  searchString: string = "";

  
  constructor(private GLBSdataservice:DataService, private router:Router, private snackBar:MatSnackBar) { }

  
  ngOnInit(): void {
    this.GetAllDiscounts();
    
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
      const snackBarRef: MatSnackBarRef<any> = this.snackBar.open('The discount has been deleted. ', 'X', { duration: 3000 , verticalPosition: 'top' });
      snackBarRef.afterDismissed().subscribe(() => {
      location.reload();
    });
        this.GetAllDiscounts();
      }
    })
  }

  SearchDiscounts(){

    this.GLBSdataservice.GetAllDiscounts().subscribe(res => {
      this.Discount = res as Discount[];

      this.searchedDiscounts = this.Discount;

      this.searchedDiscounts = this.Discount.filter((discount) => 
  
      discount.amount == Number(this.searchString)
      || discount.date.includes(this.searchString)
      
      );
  
      this.Discount = this.searchedDiscounts;
  
      console.log("It works")
  });

  }

  

}

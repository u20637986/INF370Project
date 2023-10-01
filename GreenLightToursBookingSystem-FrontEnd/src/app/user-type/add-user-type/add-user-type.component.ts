import { UserType } from './../../shared/user-type';
import { Component , OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBarRef , MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';

@Component({
  selector: 'app-add-user-type',
  templateUrl: './add-user-type.component.html',
  styleUrls: ['./add-user-type.component.scss']
})
export class AddUserTypeComponent implements OnInit {

  userType: UserType = {
    userTypeID:0,
    name: '',
    description:''
  };

  UserTypeForm = new FormGroup(
    {
        name: new FormControl(''),
        description: new FormControl('')
    })

    constructor(private dataService: DataService, private router: Router, private snackBar:MatSnackBar) { }

    ngOnInit(): void {
    }

    cancel(){
      this.router.navigate(['/user-type'])
    }
    AddUserType(){

      if (this.UserTypeForm.valid) 
      {
        this.dataService.AddUserType(this.userType).subscribe({
          next:(userType) => {
  
            userType.name = this.UserTypeForm.value.name;
            userType.description = this.UserTypeForm.value.description;
  
           this.router.navigate(['/user-type'])
          }
        })
      }
      else 
      {
        const snackBarRef: MatSnackBarRef<any> = this.snackBar.open(' Please check all input fields are entered', 'X', { duration: 5000 , verticalPosition: 'top' });
    snackBarRef.afterDismissed().subscribe(() => {
      location.reload();
    });
      }
      

      
    }


  }




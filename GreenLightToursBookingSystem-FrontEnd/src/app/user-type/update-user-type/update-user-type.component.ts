import { Component } from '@angular/core';
import { DataService } from 'src/app/service/GLBSdataservice';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserType } from 'src/app/shared/user-type';

@Component({
  selector: 'app-update-user-type',
  templateUrl: './update-user-type.component.html',
  styleUrls: ['./update-user-type.component.scss']
})
export class UpdateUserTypeComponent {

  constructor(private data:DataService, private router : Router , private activated:ActivatedRoute) { }

  //Creating the form 
  editUserType: UserType = new UserType();

  updateUserTypeForm: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required]),
    description: new FormControl('',[Validators.required])
  })

  ngOnInit(): void {

    // GET THE ID FROM THE URL 
   this.activated.params.subscribe(params => { 


    //SEND OFF REQUEST TO DB TO FIND OBJECT DATA 
    this.data.GetUserTypes(params['UserTypeId']).subscribe(response => { //SUBSCRIBE TO THE RESPONSE

     //MAP THE RESPONSE TP THE CURRENT EDITCOURSE OBJECT
     this.editUserType = response as UserType;

     //MAP THE RESPONSE VALUES TO THE FORM 
     this.updateUserTypeForm.controls['name'].setValue(this.editUserType.name);
     this.updateUserTypeForm.controls['description'].setValue(this.editUserType.description);
    
    })

   })
}

UpdateUserType()
  {
    let usertype = new UserType();
    usertype.name = this.updateUserTypeForm.value.name;
    usertype.description = this.updateUserTypeForm.value.description;
    

   this.data.EditUserType(this.editUserType.userTypeID,usertype).subscribe((response:any) => {

    if(response.statusCode == 200)
    {
    
      this.router.navigate(['/user-type'])
      
    }
    else
    {
      console.log(response.message);
      this.router.navigate(['/user-type'])
    }
   });

  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedNavService } from '../service/shared-nav.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  signupForm!: FormGroup;
  isValidEmail!: boolean;
  showToolbar:boolean=true

  constructor(private formBuilder : FormBuilder, private authService: AuthService, private router: Router, private snack:MatSnackBar,
    public sharednavservice:SharedNavService){}

  ngOnInit(): void {

    this.sharednavservice.hideSideNav = true;
  this.sharednavservice.hideToolBar = true;

  
    this.signupForm = this.formBuilder.group({
      name:['', Validators.required],
      surname:['', Validators.required],
      username:['', Validators.required],
      useremail:['', Validators.required],
      password:['', Validators.required],
      role:''
    })
  }


  onSubmit() {
    if (this.signupForm.valid) {

        const register = {
          name: this.signupForm.value.name,
          surname:this.signupForm.value.surname,
          username:this.signupForm.value.username,
          useremail:this.signupForm.value.useremail,
          password:this.signupForm.value.password,
          role: 'User'
        };

        this.authService.register(register).subscribe({
          next:(res)=>{
            this.authService.user(register.role);
            this.router.navigate(['login']); 
          }
        })
        //this.authService.register(register).subscribe(() => {this.router.navigate(['login'])});
        
    } else {
      this.validateFields(this.signupForm);
    }
  }
  

  private validateFields(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const ctrl = formGroup.get(field);

      if (ctrl instanceof FormControl){
        ctrl.markAsDirty({onlySelf:true});
      }else if(ctrl instanceof FormGroup){
        this.validateFields(ctrl)
      }
    })
  }

}

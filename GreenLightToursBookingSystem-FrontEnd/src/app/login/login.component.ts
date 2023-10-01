import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ResetService } from '../service/reset.service';
import { User } from '../shared/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedNavService } from '../service/shared-nav.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user !: User
  loginForm!: FormGroup;
  userEmail!: string;
  public resetEmail!:string;
  public isValidEmail! : boolean;
  showToolbar:boolean=true
  public FAToken!:string;
  twoFactorToken!:string


 constructor(
  private formbuilder: FormBuilder, 
  private authService: AuthService, 
  private router : Router, private resetService: ResetService, private snackbar: MatSnackBar, public sharednavservice:SharedNavService){
    this.userEmail = localStorage.getItem('email') || '';
    //sharednavservice.hideSideNav = true;
    //sharednavservice.hideToolBar = true
  }

 ngOnInit(): void{

  //this.sharednavservice.hideSideNav = true;
  //this.sharednavservice.hideToolBar = true;

  this.loginForm = this.formbuilder.group({
    useremail: ['', Validators.required],
    password: ['', Validators.required],
    role:''
  })
 }


onSubmit() {
  if (this.loginForm.valid) {
    const login = {
      useremail:this.loginForm.value.useremail,
      password:this.loginForm.value.password,
      
      role: 'User'
    };

    this.authService.login(login).subscribe({
      next: (res) => {
        //alert(res.message);
        this.authService.user(login.role)
        this.authService.token(res.accessToken);
        this.authService.userID(res.userId);
        this.authService.getEmail(res.emailAddress)
       
        /*if (res.userID !== undefined) {
          localStorage.setItem('userID', res.userID.toString());
        } */
        
        console.log(res)
        this.authService.token(res.accessToken);

          //this.router.navigate(['booking-controller']); //navigate to home
        },
        error: (err) => {
          if (err && err.error && err.error.message) {
            this.snackbar.open(err.error.message, 'Close', {
              duration: 5000
            })
          } else {
            this.snackbar.open('An error has occurred.', 'Close', {
              duration: 5000
            })
          }
        }
      });
  } else {
    this.validateFields(this.loginForm);
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

checkEmail(event:string){
  const value = event;
  const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,3}$/;
  this.isValidEmail = pattern.test(value);
  return this.isValidEmail;
}

confirmSend(){
  if(this.checkEmail(this.resetEmail)){
    console.log(this.resetEmail);
    //this.resetEmail="";

    this.resetService.sendLink(this.resetEmail).subscribe({
      next:(res)=>{
        alert(res.message);
      },
      error:(err)=>{
        alert(err?.error.message);
      }
    })
  }
}

VerifyToken(){
  if(!this.userEmail){
    alert("User email is not available.");
    return
  }

  this.authService.verify2FAToken(this.userEmail, this.twoFactorToken).subscribe(() => {
    this.router.navigate(['booking-controller']);
  },
  (error) => {
    alert("Try again")
  })
}
}

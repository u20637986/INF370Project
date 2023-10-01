import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { ResetService } from '../service/reset.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user !: User
  loginForm!: FormGroup;
  public resetEmail!:string;
  public isValidEmail! : boolean;


 constructor(
  private formbuilder: FormBuilder, 
  private authService: AuthService, 
  private router : Router, private resetService: ResetService){}

 ngOnInit(): void{
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
          /*this.authService.token(res.accessToken);

          const tokenPayload = this.authService.decodeToken();
          this.userRole.setRoles(tokenPayload.Role);
          console.log(this.userRole.getRoles())*/
          this.authService.token(res.accessToken);

          this.router.navigate(['trip-type']); //navigate to home
        },
        error: (err) => {
          if (err && err.error && err.error.message) {
            alert(err.error.message);
          } else {
            alert('An error occurred.');
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
}

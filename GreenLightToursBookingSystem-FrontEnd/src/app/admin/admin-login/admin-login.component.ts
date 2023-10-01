import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ResetService } from 'src/app/service/reset.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit{

  loginForm!: FormGroup;
  public resetEmail!:string;
  public isValidEmail! : boolean;

  constructor(
    private formbuilder: FormBuilder, 
    private authService: AuthService, 
    private router : Router, private resetService: ResetService){}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ''
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.AdminLogin(this.loginForm.value).subscribe({
          next: (res) => {
            alert(res.message);
            this.authService.user('Admin');
            this.router.navigate(['booking-type']); //navigate to home
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

import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent {

  signupForm!: FormGroup;
  isValidEmail!: boolean;

  constructor(private formBuilder : FormBuilder, private authService: AuthService, private router: Router){}

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      name:['', Validators.required],
      surname:['', Validators.required],
      username:['', Validators.required],
      useremail:['', Validators.required],
      password:['', Validators.required],
      role:''
    })
  }

  
  /*onSubmit(){
    if(this.signupForm.valid){
      this.authService.register(this.signupForm.value)
      .subscribe({
       next:(res=>{
        alert(res.message);
        this.signupForm.reset();
        this.router.navigate(['employee-type']); //navigate to home
      })
      ,error:(err=>{
        alert(err?.error.message)
      })
    })
    /*this.authService.register(this.signupForm.value).subscribe(() => {
      this.router.navigate(['/employee-type'])
    });*
    } else {
      this.validateFields(this.signupForm)
    }
  }*/

  onSubmit() {
    if (this.signupForm.valid) {
      /*this.authService.register(this.signupForm.value)
        .subscribe({
          next: (res) => {
            alert(res.message);
            this.authService.user(res.surname);
            this.signupForm.reset();
            this.router.navigate(['employee-type']); //navigate to home
          },
          error: (err) => {
            if (err && err.error && err.error.message) {
              alert(err.error.message);
            } else {
              alert('An error occurred.');
            }
          }
        });*/

        const register = {
          name: this.signupForm.value.name,
          surname:this.signupForm.value.surname,
          username:this.signupForm.value.username,
          useremail:this.signupForm.value.useremail,
          password:this.signupForm.value.password,
          role: 'Admin'
        };

        this.authService.AdminRegister(register).subscribe({
          next:(res)=>{
            this.authService.user(register.role);
            this.router.navigate(['admin-login']); 
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

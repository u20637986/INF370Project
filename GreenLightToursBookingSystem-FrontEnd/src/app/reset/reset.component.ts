import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ResetService } from 'src/app/service/reset.service';
import { PasswordValidator } from 'src/app/shared/password.validator';
import { ResetPassword } from 'src/app/shared/resetPassword';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit{

  resetForm !: FormGroup;
  emailToken !: string;
  emailToReset !: string;
  resetObj = new ResetPassword();

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute : ActivatedRoute,
    private resetService : ResetService,
    private route :Router){

  }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      newPassword: [null, Validators.required],
      confirmPassword: [null, Validators.required]
    },{
      validator : PasswordValidator("newPassword", "confirmPassword")
    });


    this.activatedRoute.queryParams.subscribe(value => {
      this.emailToReset = value['email'];
      let URIToken = value['code'];

      this.emailToken = URIToken.replace(/ /g, '+');
      console.log(this.emailToken);
      console.log(this.emailToReset);
    })
  }

  reset(){
    if(this.resetForm.valid){
      this.resetObj.email = this.emailToReset;
      this.resetObj.newPassword = this.resetForm.value.newPassword;
      this.resetObj.confirmPassword = this.resetForm.value.confirmPassword;
      this.resetObj.emailToken = this.emailToken;

      this.resetService.resetPassword(this.resetObj).subscribe({
        next: (res) => {
          alert(res.message)
          this.route.navigate(['/'])
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    } else {
      this.validateFields(this.resetForm);
  
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

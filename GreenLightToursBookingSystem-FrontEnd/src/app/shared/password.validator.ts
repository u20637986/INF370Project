import { FormGroup } from "@angular/forms";

export function PasswordValidator(controlName : string, matchControlName : string){
    return (formGroup : FormGroup) => {
        const passwordControl = formGroup.controls[controlName];
        const confirmPasswordControl = formGroup.controls[matchControlName];

        if(confirmPasswordControl.errors && confirmPasswordControl.errors['PasswordValidator']){
            return;
        }

        if(passwordControl.value !== confirmPasswordControl.value){
            confirmPasswordControl.setErrors({PasswordValidator : true})
        } else {
            confirmPasswordControl.setErrors(null);
        }
    }
}
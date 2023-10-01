import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent {

  errorMessage:string="";

  categoryForm= new FormGroup({
    name:new FormControl('', [
			Validators.required,
			Validators.pattern(/^[A-Z][a-zA-Z ]*$/), // Letters
		  ]),
      description: new FormControl('', [
        Validators.required
        ]),
  })

  categoryID!:number;
  category:any;

  constructor(
		private dataService: DataService,
		private router: Router,
		private route: ActivatedRoute,
    private snackBar:MatSnackBar
	) { }


  async ngOnInit(): Promise<void> {

		this.categoryID = +this.route.snapshot.params['categoryID'];

		console.log('Category ID:', this.categoryID);

		this.dataService.getHelpCategory(this.categoryID).subscribe((result: any) => {
			this.category = result;

      this.categoryForm.patchValue({
        name:this.category.name,
        description:this.category.description
      })
    })
}

cancel() {
  this.router.navigate(['/help-category'])
}

onSubmit() {

  if (this.categoryForm.invalid) {
    this.errorMessage = "Please provide all required fields";
    return;
  }

  this.errorMessage='';

  const category:{
    name:string,
    description:string
  }={
    name:this.categoryForm.value.name!,
    description:this.categoryForm.value.description!
  };

  this.dataService.editHelpCategory(this.categoryID, category)
  .subscribe((result: any) => {
    if (result) {
      this.errorMessage = "Help Category has been updated";
      this.showSnackbar(`Help Category updated successfully`, 'success-snackbar');
      this.router.navigate(['/help-category']);
    }

    else () => {
      // Handle the error response here, if needed
      console.error('Error updating help category.');
      this.showSnackbar(`Help Category could not be updated`, 'error-snackbar');
      this.errorMessage='Error updating help category. Please  check your connection and try again.';
    }
  })
}
getErrorMessage(controlName: string) {
  const control = this.categoryForm.get(controlName);

  if (!control) {
    return ''; // Return an empty string if the control is not found
  }

  if (control.hasError('required')) {
    return 'This field is required';
  }

  if (controlName === 'name') {
    if (control.hasError('pattern') || control.hasError('required')) {
      return 'Enter a valid name. It must start with a capital letter(e.g.,Name)';
    }
    // Add additional error checks for price if needed
  }

  if (controlName === 'description') {
    if (control.hasError('pattern') || control.hasError('required')) {
      return 'Description is required.';
    }
    // Add additional error checks for price if needed
  }


  return '';
}

showSnackbar(message: string, panelClass: string) {
  this.snackBar.open(message, 'Close', {
    duration: 6000,
    panelClass: [panelClass],
  });
};
}


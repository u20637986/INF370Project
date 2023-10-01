import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { HelpCategory } from 'src/app/shared/helpCategory';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {

  categoryForm!: FormGroup;
  name!: string;
  description!: string;
  categories: HelpCategory[] = [];

  errorMessage: string = "";

  constructor(
    private dataService: DataService,
    private route: Router,
    private fb: FormBuilder,
    private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    this.buildForm();

  }

  private buildForm() {
    this.categoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[A-Z][a-zA-Z ]*$/)]], // Letters and numbers],
      description: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9 ]+$/)]], // Letters and numbers],
    });
  }

  onSubmit(): void {

    if (this.categoryForm.invalid) {
      this.errorMessage = "Please provide all required fields";
      return;
    }
    this.errorMessage = '';

    const helpCategory: {
      name: string,
      description: string,
    } =
    {
      name: this.categoryForm.value.name,
      description: this.categoryForm.value.description
    };

    const existingCategory=this.categories.find(
      (category)=>category.name===this.categoryForm.value.name
    );

    if(existingCategory!=undefined){
      this.errorMessage = "A help category with this name already exists.";
			return;
    }

    else{
      this.dataService.addHelpCategory(helpCategory)
      .subscribe(()=>{
        console.log('Help category added successfully:');
					this.showSnackbar(`Help category added successfully`, 'success-snackbar');
					this.route.navigate(['/help-category']);
				},
				(error) => {
					// Handle the error response here, if needed
					console.error('Error adding help category:', error);
					this.showSnackbar(`Help category could not be added`, 'error-snackbar');
					this.errorMessage='Error adding help category: '+ error;
				})
    }
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


  cancel() {

    this.categoryForm.reset();
    this.route.navigate(['/help-category']);

  }
}

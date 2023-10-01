
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { HelpCategory } from 'src/app/shared/helpCategory';
import { Help } from 'src/app/shared/help';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-manual',
  templateUrl: './add-manual.component.html',
  styleUrls: ['./add-manual.component.scss']
})
export class AddManualComponent implements OnInit {

  helpForm!: FormGroup;
  question!: string;
  answer!: string;
  videoURL!: string;
  fileName!: string;
  fileData!: string;
  manuals: Help[] = [];
  category: any;
  categoryID: any;
  categories: HelpCategory[] = [];
  selectedVideo: File | null = null;
  errorMessage: string = "";


  constructor(private dataService: DataService, private route: Router, private fb: FormBuilder,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getCategoriesFromAPI();
    this.buildForm();
  }

  private getCategoriesFromAPI() {
    this.dataService.getAllHelpCategories().subscribe((result: any) => {
      let response = result as HelpCategory[];
      this.categories = response;
    })
  }

  private buildForm() {
    this.helpForm = this.fb.group({
      question: ['', Validators.required],
      categoryID: ['', Validators.required],
      videoURL: ['', Validators.required],
      fileName: ['', Validators.required],
      fileData: ['', Validators.required]
    })
  }

  getCategories() {
    this.dataService.getAllHelpCategories().subscribe(result => {
      let categoryList: any[] = result;
      categoryList.forEach((element) => {
        this.category.push(element);
      });
    });
  }



  selectFile(event: any) {
    if (event.target.files) {
      const allowedFileTypes = ['application/pdf'];

      if (event.files.length === 0) {
        // No file selected, handle accordingly (e.g., show an error message)
       this.errorMessage='Please upload a PDF file.';
        return;
      }

      for (const file of event.target.files) {
        if (!allowedFileTypes.includes(file.type)) {
          this.errorMessage = 'Please select a PDF file.';
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event: any) => {
          this.fileData = event.target.result;
          this.fileName = file.name;
          this.errorMessage = '';
        };
      }
    }
  }

  selectVideo(event: any) {
    if (event.target.files) {
      for (const file of event.target.files) {
        if (file.type !== 'video/mp4') {
          this.errorMessage = "Please upload a mp4 video.";
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event: any) => {
          this.videoURL = event.target.result;
          this.errorMessage = "";
        }
      }
    }
  }


  onSubmit(): void {

    console.log(this.helpForm.value);
    console.log(this.videoURL)
    console.log("File name: " + this.fileName);
    console.log("File path: " + this.fileData);

    this.errorMessage = '';

    const manual: {
      question: string,
      categoryID: number,
      category: string,
      videoURL: string,
      fileName: string,
      fileData: string
    } = {
      question: this.helpForm.value.question,
      categoryID: this.helpForm.value.categoryID,
      category: this.helpForm.value.category,
      videoURL: this.videoURL,
      fileName: this.fileName,
      fileData: this.fileData
    };

    const existingManual = this.manuals.find(
      (manual) => manual.categoryID === this.helpForm.value.categoryID
    );

    if (existingManual != undefined) {
      this.errorMessage = "A help manual under this category already exists.";
      return;
    }
    else {
      this.dataService.addHelpManual(manual)
        .subscribe(() => {
          console.log('Help added successfully:');
          this.showSnackbar(`Help manual added successfully`, 'success-snackbar');
          this.route.navigate(['/help-manual']);
        },
          (error) => {
            // Handle the error response here, if needed
            console.error('Error adding help:', error);
            this.showSnackbar(`Help manual could not be added`, 'error-snackbar');
            this.errorMessage = 'Error adding help: ' + error;

          }
        )

    }
  }

  getErrorMessage(controlName: string) {
    const control = this.helpForm.get(controlName);

    if (!control) {
      return ''; // Return an empty string if the control is not found
    }

    if (control.hasError('required')) {
      return 'This field is required';
    }

    if (controlName === 'question') {
      if (control.hasError('pattern') || control.hasError('required')) {
        return 'Enter a question.';
      }
    }

    if (controlName === 'categoryID') {
      if (control.hasError('pattern') || control.hasError('required')) {
        return 'Select a help category.';
      }
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
    this.helpForm.reset();
    this.route.navigate(['/help-manual']);
  }

}
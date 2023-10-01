import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { Help } from 'src/app/shared/help';
import { HelpCategory } from 'src/app/shared/helpCategory';

@Component({
  selector: 'app-edit-manual',
  templateUrl: './edit-manual.component.html',
  styleUrls: ['./edit-manual.component.scss']
})
export class EditManualComponent implements OnInit{

  helpForm!: FormGroup;
  errorMessage: string = '';
  currentVideoURL: string = ''; 
  currentDocumentURL: string = ''; 
  help!: Help; 
  //categories: any[] = [];
  videoURL: string = ''; 
  fileName: string = ''; 
  fileData: string = ''; 
  //errorMessage: string = '';
  categories: HelpCategory[] = [];
  category!:any;


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildForm();
    const helpID = +this.route.snapshot.params['helpID'];
    this.dataService.getHelpManual(helpID).subscribe((res: Help) => {
      this.help = res;
      //this.currentVideoURL = this.help.videoURL;
      //this.currentDocumentURL = this.help.fileName; // Assuming this is the URL for the document
      this.helpForm.patchValue({
        question: this.help.question,
        categoryID: this.help.categoryID,
        videoURL: this.help.videoURL,
        fileName: this.help.fileName,
        fileData: this.help.fileData
      });
    });
  }

  buildForm() {
    this.helpForm = this.fb.group({
      question: ['', Validators.required],
      categoryID: ['', Validators.required],
      videoURL: ['', Validators.required],
      fileName: ['', Validators.required],
      fileData: ['', Validators.required]
    });
  }

  // Add your selectFile and selectVideo methods here

  onSubmit(): void {
    if (this.helpForm.valid) {
      // Construct the updated Help object
      const updatedHelp: Help = {
        ...this.help,
        question: this.helpForm.value.question,
        categoryID: this.helpForm.value.categoryID,
        videoURL: this.helpForm.value.videoURL,
        fileName: this.helpForm.value.fileName
      };

      // Call the data service to update the help entry
      this.dataService.editHelp(updatedHelp.helpID, updatedHelp).subscribe(
        () => {
          this.router.navigate(['/help-manual']);
        },
        (error) => {
          this.errorMessage = 'Error updating help: ' + error;
        }
      );
    } else {
      // Handle form validation errors here
    }
  }

  selectVideo(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type !== 'video/mp4') {
        this.errorMessage = 'Please upload a video in MP4 format.';
        return;
      }
      
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = (event: any) => {
        this.helpForm.patchValue({videoURL : event.target.result})        
        this.errorMessage = '';
      };
    }
  }


  selectFile(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log('Selected file:', file);
      
      const allowedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  
      if (!allowedFileTypes.includes(file.type)) {
        this.errorMessage = 'Please select a PDF or Word document file.';
        return;
      }
  
      const reader = new FileReader();
      reader.onload = (event: any) => {
        console.log('File data:', event.target.result);
        console.log('File name:', file.name);
        this.helpForm.patchValue({
          fileData: event.target.result,
          fileName: file.name
        });
        this.errorMessage = '';
      };
      reader.readAsDataURL(file);
    }
  }
  

  private getCategoriesFromAPI (){
    this.dataService.getAllHelpCategories().subscribe((result: any) => {
			let response = result as HelpCategory[];
			this.categories = response;
		})
  }

  getCategories(){
    this.dataService.getAllHelpCategories().subscribe(result => {
			let categoryList: any[] = result;
			categoryList.forEach((element) => {
				this.category.push(element);
			});
		});
  }

  cancel(): void {
    this.router.navigate(['/help-manual']);
  }
}

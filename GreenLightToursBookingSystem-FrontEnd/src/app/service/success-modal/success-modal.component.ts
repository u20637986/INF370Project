import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-modal',
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent {

  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string },
  private dialogRef: MatDialogRef<SuccessModalComponent>) {

    this.message = data.message;
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}


import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SuccessModalComponent } from './success-modal/success-modal.component';
import { ErrorModalComponent } from './error-modal/error-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  constructor(private dialog: MatDialog) {}

  openSuccessModal(message: string): void {
    this.dialog.open(SuccessModalComponent, {
      data: { message },
    });
  }

  openErrorModal(message: string): void {
    this.dialog.open(ErrorModalComponent, {
      data: { message },
    });
  }
}
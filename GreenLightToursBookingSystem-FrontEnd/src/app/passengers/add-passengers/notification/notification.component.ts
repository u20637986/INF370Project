import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {

  constructor(private router: Router, public dialog:MatDialog){}
  ngOnInit(): void {
  }
 /* openDialog() {
    const dialogRef = this.dialog.closeAll(NotificationComponent, {
      width: '400px', // Set the width of the dialog (optional)
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        // Action for "Yes" button here
        console.log('Yes clicked');
      } else if (result === 'no') {
        // Action for "No" button here
        console.log('No clicked');
      } else {
        // Dialog closed without clicking any action (optional)
        console.log('Dialog closed');
      }
    });*/
    OnYesClick(){

      location.reload();

    }

    OnNoClick(){
     // this.router.navigate(['/AddPassenger']);
     this.router.navigate(['/passengers']);
     this.dialog.closeAll();
    }
  }




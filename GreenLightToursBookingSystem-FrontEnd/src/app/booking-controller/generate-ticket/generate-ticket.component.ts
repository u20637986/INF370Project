import { Component } from '@angular/core';
import { DataService } from 'src/app/service/GLBSdataservice';
// import { EmailModel } from 'src/app/shared/emailModel';


@Component({
  selector: 'app-generate-ticket',
  templateUrl: './generate-ticket.component.html',
  styleUrls: ['./generate-ticket.component.scss']
})
export class GenerateTicketComponent {

  emailTo: string = '';
  subject: string = 'DO NOT REPLY TO THIS MESSAGE SENDER: Booking Ticket Detail'; // Set your predefined subject here
  content: string = '';

  constructor(private dataService : DataService) {}


  // sendEmail() {
  //   const emailModel: EmailModel = {
  //     emailTo: this.emailTo,
  //     subject: this.subject,
  //     content: this.content
  //   };

  //   this.dataService.sendEmail(emailModel).subscribe(
  //     response => {
  //       console.log(response); // Handle success, e.g., show a success message
  //     },
  //     error => {
  //       console.error(error); // Handle error, e.g., show an error message
  //     }
  //   );
  // }

}

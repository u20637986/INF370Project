import { Component } from '@angular/core';
import { SharedNavService } from 'src/app/service/shared-nav.service';

@Component({
  selector: 'app-print-button',
  templateUrl: './print-button.component.html',
  styleUrls: ['./print-button.component.scss']
})
export class PrintButtonComponent {

  constructor(public sharedNavService:SharedNavService){}
  print() {
   // this.sharedNavService.hideSideNav = true;
   // this.sharedNavService.hideToolBar = true;
    window.print();
    this.sharedNavService.hideSideNav = false;
    this.sharedNavService.hideToolBar = false;
  }

}

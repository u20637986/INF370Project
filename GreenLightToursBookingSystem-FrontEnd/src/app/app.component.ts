import { Component , ViewChild} from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDrawerMode} from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';
import { Observer } from 'rxjs';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver , public sharednavservice: SharedNavService) {}

  ngAfterViewInit() {

        this.sidenav.mode = "over";
        this.sidenav.close();


    };

  title = 'GreenLightToursBookingSystem-FrontEnd';
  mode = new FormControl('over' as MatDrawerMode);
  loggedIn:boolean=false;
  opened: boolean=false;
}import { SharedNavService } from './service/shared-nav.service';


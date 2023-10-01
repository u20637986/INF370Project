import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { Help } from 'src/app/shared/help';

@Component({
  selector: 'app-help-manual',
  templateUrl: './help-manual.component.html',
  styleUrls: ['./help-manual.component.scss']
})
export class HelpManualComponent  implements OnInit{

  manuals: Help[] = [];

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.getManuals();
  }

  getManuals() {
    this.dataService.getAllHelpManuals().subscribe(result => {
      this.manuals = result as Help[];
    });
  }

  
  deleteHelp(helpID: number) {
    if (confirm('Are you sure you want to delete this?')) {
      this.dataService.deleteHelp(helpID).subscribe(result => {
        window.location.reload();
        this.getManuals();
      });
    }
  }

}

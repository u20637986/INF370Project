import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/GLBSdataservice';
import { Router } from '@angular/router';
import { Help } from '../shared/help';
import { HelpParagraphService } from '../service/help-paragraph.service';
import { SharedNavService } from '../service/shared-nav.service';

@Component({
  selector: 'app-client-help',
  templateUrl: './client-help.component.html',
  styleUrls: ['./client-help.component.scss']
})
export class ClientHelpComponent implements OnInit{

  manuals:Help[]=[];

  constructor(private dataService: DataService, private router: Router, public helpService:HelpParagraphService, private shared:SharedNavService) { 
    shared.hideSideNav = true
    shared.hideToolBar = true
  }

  ngOnInit(): void {
    this.getManuals()
    console.log("Existing Manuals:" + this.manuals)
   
  }
  getManuals(){
    this.dataService.getAllHelpManuals().subscribe(result => {
      let manualList: any[] = result
      manualList.forEach((element) => {
        this.manuals.push(element)
      });
    })
  }
}

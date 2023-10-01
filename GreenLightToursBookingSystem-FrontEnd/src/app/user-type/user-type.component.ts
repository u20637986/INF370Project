import { UserType} from './../shared/user-type';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/GLBSdataservice';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent  implements OnInit {
  userTypes:UserType[] = []

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.GetAllUserTypes()
  }

  GetAllUserTypes()
  {
    this.dataService.GetAllUserTypes().subscribe(result => {
      let userTypeList:any[] = result
      userTypeList.forEach((element) => {
        this.userTypes.push(element)
      });
    })
  }

  DeleteUserType(UserTypeID: Number){
    this.dataService.DeleteUserType(UserTypeID).subscribe(result => {
      window.location.reload();
      });
    }
}

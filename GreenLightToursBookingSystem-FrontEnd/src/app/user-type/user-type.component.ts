import { UserType} from './../shared/user-type';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/GLBSdataservice';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent  implements OnInit {

  dataSource = new MatTableDataSource<UserType>();
  userTypes:UserType[] = []
  searchedUserTypes:UserType[]=[]
  searchString: string = "";

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

  EditUserType(UserTypeID:Number)
  {
    this.router.navigate(['/update-user-type',UserTypeID]);
  }

  DeleteUserType(UserTypeID: Number){
    this.dataService.DeleteUserType(UserTypeID).subscribe(result => {
      window.location.reload();
      });
    }

    
    SearchUserTypes(){

      

      this.dataService.GetAllUserTypes().subscribe(res => {
        this.userTypes = res as UserType[];
  
        this.searchedUserTypes = this.userTypes;
  
        this.searchedUserTypes = this.userTypes.filter((usrType) => 
    
        usrType.name.includes(this.searchString)
        || usrType.description.includes(this.searchString)
        
        );
    
        this.userTypes = this.searchedUserTypes;
    
        console.log("It works")
    });
  
    }

}

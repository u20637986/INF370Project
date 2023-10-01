import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceEntity } from '../shared/serviceentity';
import { DataService } from '../service/GLBSdataservice';


@Component({
  selector: 'app-service-entity',
  templateUrl: './service-entity.component.html',
  styleUrls: ['./service-entity.component.scss']
})
export class ServiceEntityComponent implements OnInit {
  services:ServiceEntity[] = []

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.GetAllServices()
  }

  GetAllServices()
  {
    this.dataService.GetAllServices().subscribe(result => {
      let servicesList:any[] = result
      servicesList.forEach((element) => {
        this.services.push(element)
      });
    })
  }

  EditService(serviceID:Number)
  {
    this.dataService.setSelectedService(serviceID);
    this.router.navigate(['/edit-service-entity']);
  }

  DeleteService(ServiceID: Number){
    this.dataService.DeleteService(ServiceID).subscribe(result => {
      window.location.reload();
      });
    }
}

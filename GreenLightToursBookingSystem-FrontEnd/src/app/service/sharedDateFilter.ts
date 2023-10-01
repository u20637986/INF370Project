import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDateFilter {

  hideEndDate:boolean = false;
  hideStartDate:boolean = false;
  button:boolean=false;

}

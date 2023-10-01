import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component , OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { DataService } from 'src/app/service/rentalDataService';
import { Rental } from 'src/app/shared/rental';
import { RentalBase } from 'src/app/shared/rentalBase';

import { Md5 } from 'ts-md5';
//import {  HttpHeaders, RequestMode } from '@angular/common/http';
declare function payfast_do_onsite_payment(param1 : any, callback: any): any;

@Component({
  selector: 'app-pay-rental-application',
  templateUrl: './pay-rental-application.component.html',
  styleUrls: ['./pay-rental-application.component.scss']
})
export class PayRentalApplicationComponent {

   rental:any;
   totalPrice!: number;

  

 constructor(private httpComms : HttpClient, private Router : Router, private dataservices: DataService, private formBuilder: FormBuilder) {
    
 }

 ngOnInit(): void {
   
//localStorage.setItem("Rental")
 }

 getSignature(data : Map<string, string>) : string {
   let tmp = new URLSearchParams();
   data.forEach((v, k)=> {
     tmp.append(k, v)
   });
   let queryString = tmp.toString();
   let sig = Md5.hashStr(queryString);
   return sig;
 }

 async doOnSitePayment() {
   let onSiteUserData = new Map<string, string>();
   onSiteUserData.set("merchant_id", "10030509")
   onSiteUserData.set("merchant_key", "zhd0xa0ozrpuo")

   onSiteUserData.set('return_url', window.location.origin + '/success')
   onSiteUserData.set('cancel_url', window.location.origin + '/cancel')

   onSiteUserData.set("email_address", 'test@user.com');
   this.rental = JSON.parse(localStorage.getItem("Rental")!)

   onSiteUserData.set("amount", this.rental.rentalApplication.totalPrice.toString());
   onSiteUserData.set("item_name", "Rental");

   onSiteUserData.set('passphrase', 'HelloWorldHello');

   let signature = this.getSignature(onSiteUserData);
   onSiteUserData.set('signature', signature);


   let formData = new FormData();
   onSiteUserData.forEach((val, key) => {
     formData.append(key, val);
   }); 
   
   let response;
  try {
    response = await fetch(environment.payfastOnsiteEndpoint, {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    });

    console.log('Response:', response); 

    if (response.ok) {
      let respJson = await response.json();
      let uuid = respJson['uuid'];
      payfast_do_onsite_payment({'uuid': uuid}, (res: any) => {
        if (res == true) {
          this.Router.navigate(['/paymentComplete'])
        } else {
          this.Router.navigate(['/cancel'])
        }
      });
    } else {
      console.error('Request failed with status:', response.status);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

 doFormPayment() {
   let onSiteUserData = new Map<string, string>();
   onSiteUserData.set("merchant_id", "10026206")
   onSiteUserData.set("merchant_key", "wy3z2mq4jknd2")

   onSiteUserData.set('return_url', window.location.origin + '/success')
   onSiteUserData.set('cancel_url', window.location.origin + '/cancel')

   onSiteUserData.set("email_address", 'test@user.com');
   
   onSiteUserData.set("amount", "5000");
   onSiteUserData.set("item_name", "carRental");

   onSiteUserData.set('passphrase', 'HelloWorldHello');

   let signature = this.getSignature(onSiteUserData);
   onSiteUserData.set('signature', signature);

   let autoPaymentForm = this.formBuilder.group(onSiteUserData);
   
   this.httpComms.post('https://sandbox.payfast.co.za/eng/process', onSiteUserData).subscribe(resp => {
     console.log(resp);
   });
 }
}


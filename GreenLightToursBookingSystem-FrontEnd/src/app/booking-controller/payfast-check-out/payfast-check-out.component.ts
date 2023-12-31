//import { Component } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component , OnInit} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { DataService } from 'src/app/service/GLBSdataservice';
import { Booking } from 'src/app/shared/Bookings';

import { Md5 } from 'ts-md5';
//import {  HttpHeaders, RequestMode } from '@angular/common/http';
declare function payfast_do_onsite_payment(param1 : any, callback: any): any;

@Component({
  selector: 'app-payfast-check-out',
  templateUrl: './payfast-check-out.component.html',
  styleUrls: ['./payfast-check-out.component.scss']
})
export class PayfastCheckOutComponent implements OnInit {

  booking:Booking = new Booking
  TravelPackagebooking:Booking = new Booking

 constructor(private httpComms : HttpClient, private Router : Router, private dataservices: DataService, private formBuilder: FormBuilder) {
    
  }

  ngOnInit(): void {
    
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

    if (JSON.parse(localStorage.getItem("Page")!) == "Payment")
    {
          
    let onSiteUserData = new Map<string, string>();
    onSiteUserData.set("merchant_id", "10026206")
    onSiteUserData.set("merchant_key", "wy3z2mq4jknd2")

    onSiteUserData.set('return_url', window.location.origin + '/success')
    onSiteUserData.set('cancel_url', window.location.origin + '/cancel')

    onSiteUserData.set("email_address", 'test@user.com');
    this.booking = JSON.parse(localStorage.getItem("Booking")!)
    onSiteUserData.set("amount", this.booking.totalPrice.toString());
    onSiteUserData.set("item_name", "Booking");

    onSiteUserData.set('passphrase', 'HelloWorldHello');

    let signature = this.getSignature(onSiteUserData);
    onSiteUserData.set('signature', signature);


    let formData = new FormData();
    onSiteUserData.forEach((val, key) => {
      formData.append(key, val);
    }); 
    
    let response = await fetch(environment.payfastOnsiteEndpoint, {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    });
    
    let respJson = await response.json();
    let uuid = respJson['uuid'];
    payfast_do_onsite_payment({'uuid': uuid},  (res: any) => {
      if (res == true) {
        this.Router.navigate(['/success'])
      }
      else {
        this.Router.navigate(['/cancel'])
      }
    });
    }

    if (JSON.parse(localStorage.getItem("Page")!) == "Travel Booking")
    {

      let onSiteUserData = new Map<string, string>();
    onSiteUserData.set("merchant_id", "10026206")
    onSiteUserData.set("merchant_key", "wy3z2mq4jknd2")

    onSiteUserData.set('return_url', window.location.origin + '/success')
    onSiteUserData.set('cancel_url', window.location.origin + '/cancel')

    onSiteUserData.set("email_address", 'test@user.com');
    this.TravelPackagebooking = JSON.parse(localStorage.getItem("Travel_Booking")!)
    onSiteUserData.set("amount", this.TravelPackagebooking.totalPrice.toString());
    onSiteUserData.set("item_name", "Travel_Booking");

    onSiteUserData.set('passphrase', 'HelloWorldHello');

    let signature = this.getSignature(onSiteUserData);
    onSiteUserData.set('signature', signature);


    let formData = new FormData();
    onSiteUserData.forEach((val, key) => {
      formData.append(key, val);
    }); 
    
    let response = await fetch(environment.payfastOnsiteEndpoint, {
      method: 'POST',
      body: formData,
      redirect: 'follow'
    });
    
    let respJson = await response.json();
    let uuid = respJson['uuid'];
    payfast_do_onsite_payment({'uuid': uuid},  (res: any) => {
      if (res == true) {
        this.Router.navigate(['/success'])
      }
      else {
        this.Router.navigate(['/cancel'])
      }
    });

    }

  }

  doFormPayment() {
    let onSiteUserData = new Map<string, string>();
    onSiteUserData.set("merchant_id", "10026206")
    onSiteUserData.set("merchant_key", "wy3z2mq4jknd2")

    onSiteUserData.set('return_url', window.location.origin + '/success')
    onSiteUserData.set('cancel_url', window.location.origin + '/cancel')

    onSiteUserData.set("email_address", 'test@user.com');
    
    onSiteUserData.set("amount", "100");
    onSiteUserData.set("item_name", "trip1");

    onSiteUserData.set('passphrase', 'HelloWorldHello');

    let signature = this.getSignature(onSiteUserData);
    onSiteUserData.set('signature', signature);

    let autoPaymentForm = this.formBuilder.group(onSiteUserData);
    
    this.httpComms.post('https://sandbox.payfast.co.za/eng/process', onSiteUserData).subscribe(resp => {
      console.log(resp);
    });
  }
}

import { Employee } from './../shared/employee';
import { EmployeeType } from '../shared/employeetype';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subject } from 'rxjs';
import { BookingType } from '../shared/bookingtype';
import { UserType } from '../shared/user-type';
import { TripType } from '../shared/trip-type';
import { Driver } from '../shared/driver';
import { TimeSlot } from '../shared/timeslot';
import { ServiceEntity } from '../shared/serviceentity';
import { VehicleStatus } from '../shared/VehicleStatus';
import { VehicleType } from '../shared/VehicleType';
import { VehicleBase } from '../shared/vehicleBase';
import { Inspection } from '../shared/inspection';
import { Refund } from '../shared/Refund';
import { Quotation } from '../shared/Quotation';
//import { TravelPackage } from '../shared/travelPackage';
import { Discount } from '../shared/discount';
import { BookingPrice } from '../shared/bookingPrice';
import { Booking } from '../shared/Bookings';
import { Passenger } from '../shared/passenger';
import { VehiclePrice } from '../shared/vehiclePrice';
import { TravelPackage } from '../shared/TravelPackage';
import { Schedule } from '../shared/schedule';
import { EmailModel } from '../shared/emailModel';
import { VMrefund } from '../shared/VMrefund';
import { Help } from '../shared/help';
import { HelpCategory } from '../shared/helpCategory';
import { Location } from '../shared/location';
import { licenseCode } from '../shared/licenseCode';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  apiUrl = 'https://inf370database20231001133617.azurewebsites.net/api/'


  httpOptions ={
    headers: new HttpHeaders({
      ContentType: 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) {
  }

  //Refundstatus
  GetAllRefundStatus(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Refund/GetAllRefundStatus`)
    .pipe(map(result => result));
  }

  //Travelpackagestatus
  GetAllTravelPackageStatus(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}TravelPackage/GetAllTravelPackageStatus`)
    .pipe(map(result => result));
  }

travelPackage!:Number;

GetAllTravelPackage(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}TravelPackage/GetAllTravelPackage`)
  .pipe(map(result => result));
}

setSelectedTravelPackage(selectedTravelPackageID:Number)
{
  this.travelPackage = selectedTravelPackageID;
}

getSelectedTravelPackage():Number
{
  return this.travelPackage;
}

GetTravelPackage(travelPackageID: Number):Observable<any> {
  return this.httpClient.get<TravelPackage>(`${this.apiUrl}TravelPackage/GetTravelPackage/${travelPackageID}`)
  .pipe(map(result => result))
}

EditTravelPackage(travelPackageID:Number,TravelPackage:TravelPackage) {
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.post(this.apiUrl + `TravelPackage/EditTravelPackage/${travelPackageID}?userId=${encodedUserId}`, TravelPackage);
}

DeleteTravelPackage(travelPackageID:Number):Observable<any> {
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.delete(`${this.apiUrl}TravelPackage/DeleteTravelPackage/${travelPackageID}?userId=${encodedUserId}`);
}


AddTravelPackage(addTravelPackage:TravelPackage) :Observable<any>{
  addTravelPackage.travelPackageID = 0;
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.post<TravelPackage>(this.apiUrl+`TravelPackage/AddTravelPackage?userId=${encodedUserId}`,addTravelPackage);
}



//Refund
GetAllRefunds(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Refund/GetAllRefunds`)
  .pipe(map(result => result));
}

AddRefund(addRefund:Refund) :Observable<any>{
  addRefund.RefundID = 0;
  return this.httpClient.post<TravelPackage>(this.apiUrl+`Refund/AddRefund`,addRefund);
}

// EditTravelPackage(travelPackageID:Number,TravelPackage:TravelPackage) {
//   return this.httpClient.post(this.apiUrl + `TravelPackage/EditTravelPackage/${travelPackageID}`, TravelPackage);
// }

EditRefund(refundID:Number,Refund:VMrefund) {
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.post(this.apiUrl + `Refund/EditRefund/${refundID}?userId=${encodedUserId}`, Refund);
}

   //Employee Types
  GetAllEmployeeTypes(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}EmployeeType/GetAllEmployeeTypes`)
    .pipe(map(result => result));
  }
  getEmployeeType(EmployeeTypeID: number) {
    return this.httpClient.get(`${this.apiUrl}EmployeeType/GetEmployeeType` + "/" + EmployeeTypeID)
    .pipe(map(result => result))
  }

 AddEmployeeType(addEmployeeType:EmployeeType) :Observable<any>{
   addEmployeeType.employeeTypeID = 0;
   const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
    return this.httpClient.post<EmployeeType>(this.apiUrl+`EmployeeType/AddEmployeeType?userId=${encodedUserId}`,addEmployeeType);
  }

  UpdateEmployeeType(EmployeeTypeID:Number,editEmployeeType:any){
    const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
    return this.httpClient.put<EmployeeType>(`${this.apiUrl}EmployeeType/UpdateEmployeeType/${EmployeeTypeID}?userId=${encodedUserId}`, editEmployeeType, this.httpOptions);
  }

  DeleteEmployeeType(EmployeeTypeID:Number):Observable<any> {
    const userId = localStorage.getItem('userID');
      
    if (!userId) {
      console.error("UserID not found in localStorage");
      return throwError("UserID not found in localStorage");
    }
    const encodedUserId = encodeURIComponent(userId);
    return this.httpClient.delete(`${this.apiUrl}EmployeeType/DeleteEmployeeType/${EmployeeTypeID}?userId=${encodedUserId}`);
  }


//Booking Types
GetAllBookingTypes(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}BookingType/GetAllBookingTypes`)
  .pipe(map(result => result));
}
getBookingType(BookingTypeID: number) {
  return this.httpClient.get(`${this.apiUrl}BookingType/GetBookingType` + "/" + BookingTypeID)
  .pipe(map(result => result))
}

AddBookingType(addBookingType:BookingType) :Observable<any>{
 addBookingType.bookingTypeID = 0;
 const userId = localStorage.getItem('userID');
      
 if (!userId) {
   console.error("UserID not found in localStorage");
   return throwError("UserID not found in localStorage");
 }
 const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.post<BookingType>(this.apiUrl+`BookingType/AddBookingType?userId=${encodedUserId}`,addBookingType);
}

UpdateBookingType(BookingTypeID:Number,editBookingType:BookingType){
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.put<EmployeeType>(`${this.apiUrl}BookingType/EditBookingType/${BookingTypeID}?userId=${encodedUserId}`, editBookingType, this.httpOptions);
}

DeleteBookingType(BookingTypeID:Number):Observable<any> {
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.delete(`${this.apiUrl}BookingType/DeleteBookingType/${BookingTypeID}?userId=${encodedUserId}`);
}



//User Types
GetAllUserTypes(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}UserType/GetAllUserTypes`)
  .pipe(map(result => result));
}
GetUserTypes(UserTypeID: number) {
  return this.httpClient.get(`${this.apiUrl}UserType/GetUserTypes` + "/" + UserTypeID)
  .pipe(map(result => result))
}

AddUserType(addUserType:UserType) :Observable<any>{
 addUserType.userTypeID = 0;
 const userId = localStorage.getItem('userID');
      
 if (!userId) {
   console.error("UserID not found in localStorage");
   return throwError("UserID not found in localStorage");
 }
 const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.post<UserType>(this.apiUrl+`UserType/AddUserType?userId=${encodedUserId}`,addUserType);
}

// EditUserType(UserTypeID:Number,editUserType:UserType){
//   return this.httpClient.put<UserType>(`${this.apiUrl}UserType/EditUserType/${UserTypeID}`, editUserType, this.httpOptions);
// }
EditUserType(UserTypeID:Number,UserType:UserType) {
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.put(this.apiUrl + `UserType/EditUserType/${UserTypeID}?userId=${encodedUserId}`, UserType);
}

DeleteUserType(UserTypeID:Number):Observable<any> {
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.delete(`${this.apiUrl}UserType/DeleteUserType/${UserTypeID}?userId=${encodedUserId}`);
}
//add schedule 

AddNewSchedule(addSchedule:Schedule) :Observable<any>{
  addSchedule.scheduleID = 0;
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
   return this.httpClient.post<Schedule>(this.apiUrl+`UserType/AddUserType?userId=${encodedUserId}`,addSchedule);
 }

//Employee
employee!: Number;


//Employee
GetAllEmployees(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Admin/GetAllEmployees`)
  .pipe(map(result => result));
}
getEmployee(employeeId: Number) {
  return this.httpClient.get(`${this.apiUrl}Admin/GetEmployee/${employeeId}` )
  .pipe(map(result => result))
}

// setSelectedTravelPackage(selectedTravelPackageID:Number)
// {
//   this.travelPackage = selectedTravelPackageID;
// }

// getSelectedTravelPackage():Number
// {
//   return this.travelPackage;
// }

setSelectedEmployee(selectedEmployeeID:Number)
{
  this.employee = selectedEmployeeID;
}

getSelectedEmployee():Number
{
  return this.employee;
}


AddEmployee(employee:any) :Observable<any>{
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.post<any>(this.apiUrl+`Admin/AddEmployee?userId=${encodedUserId}`,employee);
}

UpdateEmployee(employeeId:Number,employee:any){
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.put<Employee>(`${this.apiUrl}Admin/EditEmployee/${employeeId}?userId=${encodedUserId}`, employee, this.httpOptions);
}

DeleteEmployee(employeeId:Number):Observable<any> {
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.delete(`${this.apiUrl}Admin/DeleteEmployee/${employeeId}?userId=${encodedUserId}`);
}


//Driver
GetAllDrivers(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Driver/GetAllDrivers`)
  .pipe(map(result => result));
}
getDriver(DriverID: number) {
  return this.httpClient.get(`${this.apiUrl}Driver/GetDriver` + "/" + DriverID)
  .pipe(map(result => result))
}

AddDriver(addDriver:Driver) :Observable<any>{
 addDriver.driverID = 0;
 const userId = localStorage.getItem('userID');
      
 if (!userId) {
   console.error("UserID not found in localStorage");
   return throwError("UserID not found in localStorage");
 }
 const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.post<Driver>(this.apiUrl+`Driver/AddDriver?userId=${encodedUserId}`,addDriver);
}

UpdateDriver(DriverID:Number,editDriver:Driver){
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.put<Driver>(`${this.apiUrl}Driver/EditDriver/${DriverID}?userId=${encodedUserId}`, editDriver, this.httpOptions);
}

DeleteDriver(DriverID:Number):Observable<any> {
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.delete(`${this.apiUrl}Driver/DeleteDriver/${DriverID}?userId=${encodedUserId}`);
}

searchEmployeeByIdNumber(idNumber:string):Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Driver/GetEmployeeByIdNumber` + "/" + idNumber)
  .pipe(map(result => result))
}

//Trip Type
GetAllTripTypes(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}TripType/GetAllTripTypes`)
  .pipe(map(result => result));
}
getTripType(TripTypeID: number) {
  return this.httpClient.get(`${this.apiUrl}TripType/GetTripType` + "/" + TripTypeID)
  .pipe(map(result => result))
}

AddTripType(addTripType:any) :Observable<any>{
 addTripType.tripTypeID = 0;
 const userId = localStorage.getItem('userID');
      
 if (!userId) {
   console.error("UserID not found in localStorage");
   return throwError("UserID not found in localStorage");
 }
 const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.post<TripType>(this.apiUrl+`TripType/AddTripType?userId=${encodedUserId}`,addTripType);
}

UpdateTripType(TripTypeID:Number,editTripType:any){
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.put<TripType>(`${this.apiUrl}TripType/EditTripType/${TripTypeID}?userId=${encodedUserId}`, editTripType, this.httpOptions);
}

DeleteTripType(TripTypeID:Number):Observable<any> {
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.delete(`${this.apiUrl}TripType/DeleteTripType/${TripTypeID}?userId=${encodedUserId}`);
}


//Timeslot
GetAllTimeslots(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Timeslot/GetAllTimeslots`)
  .pipe(map(result => result));
}
getTimeslot(TimeslotID: number) {
  return this.httpClient.get(`${this.apiUrl}Timeslot/GetTimeslot` + "/" + TimeslotID)
  .pipe(map(result => result))
}

AddTimeslot(addTimeslot:any) :Observable<any>{
 addTimeslot.timeslotID = 0;
 const userId = localStorage.getItem('userID');
      
 if (!userId) {
   console.error("UserID not found in localStorage");
   return throwError("UserID not found in localStorage");
 }
 const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.post<TimeSlot>(this.apiUrl+`Timeslot/AddTimeslot?userId=${encodedUserId}`,addTimeslot);
}

UpdateTimeslot(TimeslotID:Number,editTimeslot:any){
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.put<TimeSlot>(`${this.apiUrl}Timeslot/EditTimeslot/${TimeslotID}?userId=${encodedUserId}`, editTimeslot);
}

DeleteTimeslot(TimeslotID:Number):Observable<any> {
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.delete(`${this.apiUrl}Timeslot/DeleteTimeslot/${TimeslotID}?userId=${encodedUserId}`);
}



//Vehicle
getVehicles(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Vehicle/GetAllVehicles`)
  .pipe(map(result => result))
}

getVehicle(VehicleID: number) {
  return this.httpClient.get(`${this.apiUrl}Vehicle/GetVehicle` + "/" + VehicleID)
  .pipe(map(result => result))
}

 AddVehicle(addVehicle:any) :Observable<any>{
  //addInspection.inspectionID = 0;
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
   return this.httpClient.post<VehicleBase>(this.apiUrl+`Vehicle/AddVehicle?userId=${encodedUserId}`, addVehicle);
 }

 UpdateVehicle(VehicleID:Number,editVehicle:any){
    const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
   return this.httpClient.put<VehicleBase>(`${this.apiUrl}Vehicle/EditVehicle/${VehicleID}?userId=${encodedUserId}`, editVehicle, this.httpOptions);
 }

 DeleteVehicle(VehicleID:Number):Observable<any> {
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
   return this.httpClient.delete(`${this.apiUrl}Vehicle/DeleteVehicle/${VehicleID}?userId=${encodedUserId}`);
 }

 hasActiveRentalApplicationsForVehicle(vehicleId: number) {
  const url = `${this.apiUrl}Vehicle/HasActiveRentalApplicationsForVehicle/${vehicleId}`;
  
  // Send a GET request to the backend API
  return this.httpClient.get<boolean>(url);
}

getVehicleStatus(): Observable<VehicleStatus[]> {
  return this.httpClient.get<VehicleStatus[]>(`${this.apiUrl}Vehicle/GetAllVehicleStatus`);
}

getVehicleTypes(): Observable<VehicleType[]> {
  return this.httpClient.get<VehicleType[]>(`${this.apiUrl}Vehicle/GetAllVehicleTypes`);
}

getVehiclePrices(vehiclePriceID:number): Observable<VehiclePrice> {
  return this.httpClient.get<VehiclePrice>(`${this.apiUrl}Vehicle/GetVehiclePrice/${vehiclePriceID}`)
}


//inspection
GetInspections(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Vehicle/GetAllInspections`)
  .pipe(map(result => result));
}

AddInspection(addInspection:any) :Observable<any>{
 //addInspection.inspectionID = 0;
 const userId = localStorage.getItem('userID');
      
 if (!userId) {
   console.error("UserID not found in localStorage");
   return throwError("UserID not found in localStorage");
 }
 const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.post<Inspection>(this.apiUrl+`Vehicle/Inspection?userId=${encodedUserId}`, addInspection);
}

//send booking email
SendEmail(email:string):Observable<any>{
  return this.httpClient.get<string>(this.apiUrl+`Booking/SendEmail/${email}`);
}


//Quotation
GetAllQuotation(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Quotation/GetAllQuotation`)
  .pipe(map(result => result));
}

AddQuotation(addQuotation:Quotation) :Observable<any>{
  addQuotation.QuotationID = 0;
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.post<Quotation>(this.apiUrl+`Quotation/AddQuotation?userId=${encodedUserId}`,addQuotation);
}

//Services
service!: Number;

GetAllServices(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Admin/GetAllService`)
  .pipe(map(result => result));
}

getService(serviceID: Number) {
  return this.httpClient.get(`${this.apiUrl}Admin/GetService` + "/" + serviceID)
  .pipe(map(result => result))
}

AddService(addService:ServiceEntity) :Observable<any>{
 addService.serviceID = 0;
 const userId = localStorage.getItem('userID');
      
 if (!userId) {
   console.error("UserID not found in localStorage");
   return throwError("UserID not found in localStorage");
 }
 const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.post<ServiceEntity>(this.apiUrl+`Admin/AddService?userId=${encodedUserId}`,addService);
}

UpdateService(serviceID:Number,ServiceEntity:ServiceEntity){
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.post(this.apiUrl + `Admin/EditService/${serviceID}?userId=${encodedUserId}`, ServiceEntity);
}

setSelectedService(selectedServiceID:Number)
{
  this.service = selectedServiceID;
}

getSelectedService():Number
{
  return this.service;
}

DeleteService(ServiceID:Number):Observable<any> {
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.delete(`${this.apiUrl}Admin/DeleteService/${ServiceID}?userId=${encodedUserId}`);
}



  //Discount end-points 
  GetAllDiscounts(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Discount/GetAllDiscounts`)
    .pipe(map(result => result));
  }
  GetDiscountById(DiscountID: number) {
    return this.httpClient.get(`${this.apiUrl}Discount/GetDiscountById` + "/" + DiscountID)
    .pipe(map(result => result))
  }
  
 
  AddDiscount(discount:any):Observable<any>{
    const userId = localStorage.getItem('userID');
      
    if (!userId) {
      console.error("UserID not found in localStorage");
      return throwError("UserID not found in localStorage");
    }
    const encodedUserId = encodeURIComponent(userId);
    return this.httpClient.post<Discount>(this.apiUrl+`Discount/AddDiscount?userId=${encodedUserId}`,discount);
  }
  
  EditDiscount(DiscountID:Number,Discount:Discount) {
    const userId = localStorage.getItem('userID');
      
    if (!userId) {
      console.error("UserID not found in localStorage");
      return throwError("UserID not found in localStorage");
    }
    const encodedUserId = encodeURIComponent(userId);
    return this.httpClient.put(this.apiUrl + `Discount/EditDiscount/${DiscountID}?userId=${encodedUserId}`, Discount);
  }
  
  DeleteDiscount(DiscountID:Number){
    const userId = localStorage.getItem('userID');
      
    if (!userId) {
      console.error("UserID not found in localStorage");
      return throwError("UserID not found in localStorage");
    }
    const encodedUserId = encodeURIComponent(userId);
    return this.httpClient.delete(`${this.apiUrl}Discount/DeleteDiscount/${DiscountID}?userId=${encodedUserId}`);
  }
  //Location end-point
  /*GetAllLocations(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Location/GetAllLocations`)
    .pipe(map(result => result));
  }*/
  GetAllLocations(): Observable<Location[]>{
    return this.httpClient.get<Location[]>(`${this.apiUrl}Location/GetAllLocations`);
  }

  //Schedule end-points
  GetSchedule(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Schedule/GetSchedule`)
    .pipe(map(result => result));
  }

  GetScheduleById(ScheduleId: number): Observable<any>{
    return this.httpClient.get( `${this.apiUrl}Schedule/GetScheduleById/${ScheduleId}`)
    .pipe(map(result => result));
  }
//Booking Price
GetBookingPrice(BookingPriceID: number): any{
  return this.httpClient.get(`${this.apiUrl}BookingPrice/GetBookingPriceByID` + "/" + BookingPriceID)
  .pipe(map(result => result))
}
GetAllBookingPrices(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}BookingPrice/GetAllBookingPrices`)
  .pipe(map(result => result));
}

//passenger 
AddPassenger(passenger:any) :Observable<any>{

  return this.httpClient.post<Passenger>(this.apiUrl+`Passenger/AddPassenger`,passenger);
}
//Report 
GetShuttleReport(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Reports/GetShuttleReport`)
  .pipe(map(result => result));
}
  //Booking Add end-point
  AddBooking(Booking:any): Observable<any>{
    return this.httpClient.post<Booking>(this.apiUrl+ `Booking/AddBooking`, Booking);
}
GetAllBookings(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Booking/GetAllBookings`)
  .pipe(map(result => result));
}
GetBookingByUserId(UserID: number): Observable<any> {
  return this.httpClient.get(`${this.apiUrl}Booking/GetBookingByUserId` + "/" + UserID)
  .pipe(map(result => result))
}
EditBookingStatus(BookingID:Number,Booking:Booking) {
  return this.httpClient.put(this.apiUrl + `Booking/EditBookingStatus/${BookingID}`, Booking);
}


//HELP
getHelpManual(helpID:number)
{
  return this.httpClient.get<Help>(`${this.apiUrl}Help/GetHelpManual/helpID`)
  .pipe(map(result=> result))
}
getAllHelpManuals(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Help/GetAllHelpManuals`)
  .pipe(map(result=> result))
}
addHelpManual(help:any):Observable<any>
{   const userId = localStorage.getItem('userID');
      
if (!userId) {
  console.error("UserID not found in localStorage");
  return throwError("UserID not found in localStorage");
}
const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.post<any>(`${this.apiUrl}Help/AddHelpManual?userId=${encodedUserId}`, help)
}


/*editHelp(helpID: number, videoData: string, fileData: string) {
  const body = {
    helpID: helpID,
    videoData: videoData, // Send the video data as a string
    fileData: fileData,   // Send the file data as a string
  };

  return this.httpClient.put<Help>(
    `${this.apiUrl}Help/EditHelp/${helpID}`,
    body
  );
}*/
GetAllRentalApplications(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}RentalApplication/ViewApplications`)
  .pipe(map(result => result));
}
editHelp(helpID: number, updatedData: any) {
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.put<Help>(
    `${this.apiUrl}Help/EditHelp/${helpID}?userId=${encodedUserId}`,
    updatedData
  );
}





deleteHelp(helpID: Number)
{
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.delete<string>(`${this.apiUrl}Help/DeleteHelp`+ "/"+ helpID + "?userId="+ encodedUserId)
}

//HELP CATEGORY
getHelpCategory(helpCategoryID:number)
{
  return this.httpClient.get<HelpCategory>(`${this.apiUrl}Help/GetHelpCategory/${helpCategoryID}`)
  .pipe(map(result=> result))
}


getAllHelpCategories(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Help/GetAllHelpCategories`)
  .pipe(map(result=> result))
}

addHelpCategory(helpCategory:any):Observable<any>
{
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  
  return this.httpClient.post<any>(`${this.apiUrl}Help/AddHelpCategory?userId=${encodedUserId}`, helpCategory)
}

editHelpCategory(helpCategoryID: number,helpCategory:any){
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.put<Help>(`${this.apiUrl}Help/EditHelpCategory/${helpCategoryID}?userId=${encodedUserId}`, helpCategory, this.httpOptions);

}

deleteHelpCategory(helpCategoryID: Number)
{
    const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId); 
  return this.httpClient.delete<string>(`${this.apiUrl}Help/DeleteHelpCategory`+ "/"+ helpCategoryID + "?userId="+ encodedUserId)
}

///////LICENSE CODE

getLicenseCode(licenseCodeID:number)
{
  return this.httpClient.get<licenseCode>(`${this.apiUrl}Driver/GetLicenseCode/${licenseCodeID}`)
  .pipe(map(result=> result))
}

GetAllLicenseCodes():Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Driver/GetAllLicenseCodes`)
  .pipe(map(result=>result))
}

addLicenseCode(licenseCode:any):Observable<any>
{
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.post<any>(`${this.apiUrl}Driver/AddLicenseCode?userId=${encodedUserId}`, licenseCode)
}

editLicenseCode(licenseCodeID: number,licenseCode:any){
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);

  return this.httpClient.put<Help>(`${this.apiUrl}Driver/EditLicenseCode/${licenseCodeID}?userId=${encodedUserId}`, licenseCode, this.httpOptions);

}

deleteLicenseCode(licenseCodeID: Number)
{
  const userId = localStorage.getItem('userID');
      
  if (!userId) {
    console.error("UserID not found in localStorage");
    return throwError("UserID not found in localStorage");
  }
  const encodedUserId = encodeURIComponent(userId);
  return this.httpClient.delete<string>(`${this.apiUrl}Driver/DeleteLicenseCode`+ "/"+ licenseCodeID + "?userId="+ encodedUserId)
}

}



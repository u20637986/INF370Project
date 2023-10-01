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
import { TravelPackage } from '../shared/travelPackage';
import { Discount } from '../shared/discount';
import { BookingPrice } from '../shared/bookingPrice';
import { Booking } from '../shared/Bookings';
import { Passenger } from '../shared/passenger';
import { VehiclePrice } from '../shared/vehiclePrice';


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
    return this.httpClient.post<EmployeeType>(this.apiUrl+`EmployeeType/AddEmployeeType`,addEmployeeType);
  }

  UpdateEmployeeType(EmployeeTypeID:Number,editEmployeeType:EmployeeType){
    return this.httpClient.put<EmployeeType>(`${this.apiUrl}EmployeeType/UpdateEmployeeType/${EmployeeTypeID}`, editEmployeeType, this.httpOptions);
  }

  DeleteEmployeeType(EmployeeTypeID:Number):Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}EmployeeType/DeleteEmployeeType/${EmployeeTypeID}`);
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
  return this.httpClient.post<BookingType>(this.apiUrl+`BookingType/AddBookingType`,addBookingType);
}

UpdateBookingType(BookingTypeID:Number,editBookingType:BookingType){
  return this.httpClient.put<EmployeeType>(`${this.apiUrl}BookingType/EditBookingType/${BookingTypeID}`, editBookingType, this.httpOptions);
}

DeleteBookingType(BookingTypeID:Number):Observable<any> {
  return this.httpClient.delete(`${this.apiUrl}BookingType/DeleteBookingType/${BookingTypeID}`);
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
  return this.httpClient.post<BookingType>(this.apiUrl+`UserType/AddUserType`,addUserType);
}

EditUserType(UserTypeID:Number,editUserType:UserType){
  return this.httpClient.put<UserType>(`${this.apiUrl}UserType/EditUserType/${UserTypeID}`, editUserType, this.httpOptions);
}

DeleteUserType(UserTypeID:Number):Observable<any> {
  return this.httpClient.delete(`${this.apiUrl}UserType/DeleteUserType/${UserTypeID}`);
}


//Employee
GetAllEmployees(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Admin/GetAllEmployee`)
  .pipe(map(result => result));
}
getEmployee(EmployeeID: number) {
  return this.httpClient.get(`${this.apiUrl}Admin/GetEmployee` + "/" + EmployeeID)
  .pipe(map(result => result))
}

AddEmployee(addEmployee:Employee) :Observable<any>{
 addEmployee.employeeID = 0;
  return this.httpClient.post<Employee>(this.apiUrl+`Admin/AddEmployee`,addEmployee);
}

UpdateEmployee(EmployeeID:Number,editEmployee:Employee){
  return this.httpClient.put<Employee>(`${this.apiUrl}Admin/EditEmployee/${EmployeeID}`, editEmployee, this.httpOptions);
}

DeleteEmployee(EmployeeID:Number):Observable<any> {
  return this.httpClient.delete(`${this.apiUrl}Admin/DeleteEmployee/${EmployeeID}`);
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
  return this.httpClient.post<Driver>(this.apiUrl+`Driver/AddDriver`,addDriver);
}

UpdateDriver(DriverID:Number,editDriver:Driver){
  return this.httpClient.put<Driver>(`${this.apiUrl}Driver/EditDriver/${DriverID}`, editDriver, this.httpOptions);
}

DeleteDriver(DriverID:Number):Observable<any> {
  return this.httpClient.delete(`${this.apiUrl}Driver/DeleteDriver/${DriverID}`);
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

AddTripType(addTripType:TripType) :Observable<any>{
 addTripType.tripTypeID = 0;
  return this.httpClient.post<TripType>(this.apiUrl+`TripType/AddTripType`,addTripType);
}

UpdateTripType(TripTypeID:Number,editTripType:TripType){
  return this.httpClient.put<TripType>(`${this.apiUrl}TripType/EditTripType/${TripTypeID}`, editTripType, this.httpOptions);
}

DeleteTripType(TripTypeID:Number):Observable<any> {
  return this.httpClient.delete(`${this.apiUrl}TripType/DeleteTripType/${TripTypeID}`);
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

AddTimeslot(addTimeslot:TimeSlot) :Observable<any>{
 addTimeslot.timeslotID = 0;
  return this.httpClient.post<TimeSlot>(this.apiUrl+`Timeslot/AddTimeslot`,addTimeslot);
}

UpdateTimeslot(TimeslotID:Number,editTimeslot:TimeSlot){
  return this.httpClient.put<TimeSlot>(`${this.apiUrl}Timeslot/EditTimeslot/${TimeslotID}`, editTimeslot, this.httpOptions);
}

DeleteTimeslot(TimeslotID:Number):Observable<any> {
  return this.httpClient.delete(`${this.apiUrl}Timeslot/DeleteTimeslot/${TimeslotID}`);
}


//Services
GetAllServices(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Admin/GetAllService`)
  .pipe(map(result => result));
}
getService(ServiceID: number) {
  return this.httpClient.get(`${this.apiUrl}Admin/GetService` + "/" + ServiceID)
  .pipe(map(result => result))
}

AddService(addService:ServiceEntity) :Observable<any>{
 addService.serviceID = 0;
  return this.httpClient.post<ServiceEntity>(this.apiUrl+`Admin/AddService`,addService);
}

UpdateService(ServiceID:Number,editService:ServiceEntity){
  return this.httpClient.put<ServiceEntity>(`${this.apiUrl}Admin/EditService/${ServiceID}`, editService, this.httpOptions);
}

DeleteService(ServiceID:Number):Observable<any> {
  return this.httpClient.delete(`${this.apiUrl}Admin/DeleteService/${ServiceID}`);
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
   return this.httpClient.post<VehicleBase>(this.apiUrl+`Vehicle/AddVehicle`, addVehicle);
 }

 UpdateVehicle(VehicleID:Number,editVehicle:any){
   return this.httpClient.put<VehicleBase>(`${this.apiUrl}Vehicle/EditVehicle/${VehicleID}`, editVehicle, this.httpOptions);
 }

 DeleteVehicle(VehicleID:Number):Observable<any> {
   return this.httpClient.delete(`${this.apiUrl}Vehicle/DeleteVehicle/${VehicleID}`);
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
  return this.httpClient.post<Inspection>(this.apiUrl+`Vehicle/Inspection`, addInspection);
}


//Travel Package
GetAllTravelPackage(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}TravelPackage/GetAllTravelPackage`)
  .pipe(map(result => result));
}

GetTravelPackage(travelPackageID: number) {
  return this.httpClient.get(`${this.apiUrl}TravelPackage/GetTravelPackage` + "/" + travelPackageID)
  .pipe(map(result => result))
}



AddTravelPackage(addTravelPackage:TravelPackage) :Observable<any>{
  addTravelPackage.travelPackageID = 0;
  return this.httpClient.post<TravelPackage>(this.apiUrl+`TravelPackage/AddTravelPackage`,addTravelPackage);
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


//Quotation
GetAllQuotation(): Observable<any>{
  return this.httpClient.get(`${this.apiUrl}Quotation/GetAllQuotation`)
  .pipe(map(result => result));
}

AddQuotation(addQuotation:Quotation) :Observable<any>{
  addQuotation.QuotationID = 0;
  return this.httpClient.post<Quotation>(this.apiUrl+`Quotation/AddQuotation`,addQuotation);
}


  EditTravelPackage(travelPackage: TravelPackage): Observable<any> {
    const url = `${this.apiUrl}/${travelPackage.travelPackageID}`;
    return this.httpClient.put(url, travelPackage);
  }

  DeleteTravelPackage(travelPackageID:Number):Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}TravelPackage/DeleteTravelPackage/${travelPackageID}`);
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
    return this.httpClient.post<Discount>(this.apiUrl+`Discount/AddDiscount`,discount);
  }
  
  EditDiscount(DiscountID:Number,Discount:Discount) {
    return this.httpClient.put(this.apiUrl + `Discount/EditDiscount/${DiscountID}`, Discount);
  }
  
  DeleteDiscount(DiscountID:Number){
    return this.httpClient.delete(`${this.apiUrl}Discount/DeleteDiscount/${DiscountID}`);
  }
  //Location end-point
  GetAllLocations(): Observable<any>{
    return this.httpClient.get(`${this.apiUrl}Location/GetAllLocations`)
    .pipe(map(result => result));
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
}



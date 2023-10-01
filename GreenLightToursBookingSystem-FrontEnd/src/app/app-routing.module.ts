import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeTypeComponent } from './employee-type/employee-type.component';
import { AddEmployeeTypeComponent } from './employee-type/add-employee-type/add-employee-type.component';
import { UpdateEmployeeTypeComponent } from './employee-type/update-employee-type/update-employee-type.component';
import { DriverComponent } from './driver/driver.component';
import { BookingTypeComponent } from './booking-type/booking-type.component';
import { TripTypeComponent } from './trip-type/trip-type.component';
import { ServiceEntityComponent } from './service-entity/service-entity.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { EmployeeComponent } from './employee/employee.component';
import { TimeslotComponent } from './timeslot/timeslot.component';
import { AddBookingTypeComponent } from './booking-type/add-booking-type/add-booking-type.component';
import { UpdateBookingTypeComponent } from './booking-type/update-booking-type/update-booking-type.component';
import { AddDriverComponent } from './driver/add-driver/add-driver.component';
import { UpdateDriverComponent } from './driver/update-driver/update-driver.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { AddTimeslotComponent } from './timeslot/add-timeslot/add-timeslot.component';
import { AddServiceEntityComponent } from './service-entity/add-service-entity/add-service-entity.component';
import { AddTripTypeComponent } from './trip-type/add-trip-type/add-trip-type.component';
import { AddUserTypeComponent } from './user-type/add-user-type/add-user-type.component';
import { UpdateUserTypeComponent } from './user-type/update-user-type/update-user-type.component';
import { UpdateTimeslotComponent } from './timeslot/update-timeslot/update-timeslot.component';
import { UpdateTripTypeComponent } from './trip-type/update-trip-type/update-trip-type.component';
import { UpdateServiceEntityComponent } from './service-entity/update-service-entity/update-service-entity.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './shared/auth.guard';
import { ResetComponent } from './reset/reset.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AddVehicleComponent } from './vehicle/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './vehicle/edit-vehicle/edit-vehicle.component';
import { InspectionComponent } from './inspection/inspection.component';
import { AddInspectionComponent } from './inspection/add-inspection/add-inspection.component';
import { AddTrailerComponent } from './trailer/add-trailer/add-trailer.component';
import { EditTrailerComponent } from './trailer/edit-trailer/edit-trailer.component';
import { TrailerComponent } from './trailer/trailer.component';
import { QuotationComponent } from './quotation/quotation.component';
import { TravelPackageComponent } from './travelpackage/travelpackage.component';
import { RefundComponent } from './refund/refund.component';
import { AddRefundComponent } from './refund/add-refund/add-refund.component';
import { AddTravelPackageComponent } from './travelpackage/add-travelpackage/add-travelpackage.component';
import { PassengersComponent } from './passengers/passengers.component';
import { UpdatePassengersComponent } from './passengers/update-passengers/update-passengers.component';
//import { AddPassengersComponent } from './passengers/add-passengers/add-passengers.component';
import { ViewRentalApplicationComponent } from './rental-application/view-rental-application/view-rental-application.component';
import { RentalProductsComponent } from './rental-application/rental-products/rental-products.component';
import { ClientViewRentalApplicationComponent } from './rental-application/client-view-rental-application/client-view-rental-application.component';
import { RentalApplicationComponent } from './rental-application/rental-application.component';
import { ShuttleBookingComponent } from './booking-controller/shuttle-booking/shuttle-booking.component';
import { BookingControllerComponent } from './booking-controller/booking-controller.component';
import { DiscountComponent } from './discount/discount.component';
import { MakePaymentComponent } from './booking-controller/make-payment/make-payment.component';
import { EditDiscountComponent } from './discount/edit-discount/edit-discount.component';
import { AddDiscountComponent } from './discount/add-discount/add-discount.component';
import { ViewBookingComponent } from './booking-controller/view-booking/view-booking.component';
import { PayfastCheckOutComponent } from './booking-controller/payfast-check-out/payfast-check-out.component';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';
import { ReportsComponent } from './reports/reports.component';
import { BookingReportsComponent } from './reports/booking-reports/booking-reports.component';
import { VehicleInspectionListComponent } from './vehicle-inspection-list/vehicle-inspection-list.component';
import { AdminRegisterComponent } from './admin/admin-register/admin-register.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { RefundReportComponent } from './refund-list-report/refund-report/refund-report.component';
import { RentalPaymentReportComponent } from './rental-payments-report/rental-payments-report.component';
import { CreateVehicleRentalApplicationComponent } from './rental-application/create-vehicle-rental-application/create-vehicle-rental-application.component';
import { PayRentalApplicationComponent } from './rental-application/pay-rental-application/pay-rental-application.component';
import { PaymentCompleteComponent } from './rental-application/payment-complete/payment-complete.component';
import { VehicleRentalListComponent } from './rental-application/vehicle-rental-list/vehicle-rental-list.component';

const routes: Routes = [
  {path: 'employee-type', component: EmployeeTypeComponent, canActivate:[AuthGuard]},
  {path:'employee-type/:id', component:UpdateEmployeeTypeComponent},
  {path:'user-type/:id',component:UpdateUserTypeComponent},
  {path:'timeslot/:id',component:UpdateTimeslotComponent},
  {path:'trip-type/:id',component:UpdateTripTypeComponent},
  {path:'employee/:id',component:UpdateEmployeeComponent},
  {path:'service/:id',component:UpdateServiceEntityComponent},
  {path: 'add-employee-type', component: AddEmployeeTypeComponent},
  {path: 'driver', component: DriverComponent},
  {path:'add-driver',component:AddDriverComponent},
  {path:'driver/:id',component:UpdateDriverComponent},
  {path: 'booking-type', component: BookingTypeComponent},
  {path:'add-booking-type', component:AddBookingTypeComponent},
  {path:'booking-type/:id',component:UpdateBookingTypeComponent},
  {path: 'trip-type', component: TripTypeComponent},
  {path: 'service-entity', component: ServiceEntityComponent},
  {path: 'user-type', component: UserTypeComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'timeslot', component: TimeslotComponent},
  {path: 'add-employee', component: AddEmployeeComponent},
  {path: 'add-service-entity', component: AddServiceEntityComponent},
  {path: 'add-timeslot', component: AddTimeslotComponent},
  {path: 'add-trip-type', component: AddTripTypeComponent},
  {path: 'add-user-type', component: AddUserTypeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset', component: ResetComponent},
  {path: 'vehicle', component: VehicleComponent},
  {path: 'add-vehicle', component: AddVehicleComponent},
  {path: 'edit-vehicle', component: EditVehicleComponent},
  {path: 'inspection', component: InspectionComponent},
  {path: 'add-inspection', component: AddInspectionComponent},
  {path: 'add-trailer', component: AddTrailerComponent},
  {path: 'edit-trailer/:trailerID', component: EditTrailerComponent},
  {path: 'trailer', component: TrailerComponent},
  {path: 'quotation', component: QuotationComponent},
  {path: 'travelpackage', component: TravelPackageComponent},
  {path: 'add-travelpackage', component:AddTravelPackageComponent},
  {path: 'refund', component: RefundComponent},
  {path: 'add-refund', component: AddRefundComponent},
  {path: 'passengers', component: PassengersComponent},
  //{path:'AddPassenger', component:AddPassengersComponent},
  {path:'passenger/:id', component:UpdatePassengersComponent},
  {path:'rental-application/:trailerID/:size/:registrationNumber/:rentalPrice', component:RentalApplicationComponent},
  {path:'rental-application/:vehicleID/:vehicleName/:registrationNumber/:vehiclePriceID/:vehicleType', component:CreateVehicleRentalApplicationComponent},
  {path:'rentalProducts', component:RentalProductsComponent},
  {path:'rental-applications',component:ClientViewRentalApplicationComponent},
  {path:'rental-applications/:rentalId', component:ViewRentalApplicationComponent},
  {path: 'booking-controller', component: BookingControllerComponent},
  {path: 'shuttle-booking', component: ShuttleBookingComponent},
  {path: 'discount', component:DiscountComponent},
  {path: 'make-payment', component:MakePaymentComponent},
  {path: 'edit-discount/:DiscountID', component:EditDiscountComponent},
  {path:'add-discount',component:AddDiscountComponent},
  {path: 'view-booking', component:ViewBookingComponent},
  {path:'payfast-check-out', component:PayfastCheckOutComponent},
  {path : 'success', component:SuccessComponent},
  {path: 'cancel', component:CancelComponent},
  {path:'reports', component:ReportsComponent},
  {path: 'booking-reports', component:BookingReportsComponent},
  {path: 'vehicle-inspection-list', component:VehicleInspectionListComponent},
  {path:'pay-rental-application',component:PayRentalApplicationComponent},
  {path:'paymentComplete', component:PaymentCompleteComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  //{path: '', redirectTo: '/make-payment', pathMatch: 'full'},
  //{path: '', redirectTo: '/payfast-check-out', pathMatch: 'full'},
  //{path: '', redirectTo: '/reports', pathMatch: 'full'},
  {path: 'admin-register', component:AdminRegisterComponent},
  {path: 'admin-login', component:AdminLoginComponent},
  {path: 'refund-list-report', component:RefundReportComponent},
  {path:'rental-payments-report', component:RentalPaymentReportComponent},
  {path: 'vehicle-rental-list', component:VehicleRentalListComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

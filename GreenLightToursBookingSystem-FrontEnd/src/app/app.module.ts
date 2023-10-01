import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './shared/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeTypeComponent } from './employee-type/employee-type.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AddEmployeeTypeComponent } from './employee-type/add-employee-type/add-employee-type.component';
import { UpdateEmployeeTypeComponent } from './employee-type/update-employee-type/update-employee-type.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TripTypeComponent } from './trip-type/trip-type.component';
import { TimeslotComponent } from './timeslot/timeslot.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { EmployeeComponent } from './employee/employee.component';
import { DriverComponent } from './driver/driver.component';
import { BookingTypeComponent } from './booking-type/booking-type.component';
import { ServiceEntityComponent } from './service-entity/service-entity.component';
import { AddDriverComponent } from './driver/add-driver/add-driver.component';
import { UpdateDriverComponent } from './driver/update-driver/update-driver.component';
import { AddBookingTypeComponent } from './booking-type/add-booking-type/add-booking-type.component';
import { UpdateBookingTypeComponent } from './booking-type/update-booking-type/update-booking-type.component';
import { AddEmployeeComponent } from './employee/add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { AddServiceEntityComponent } from './service-entity/add-service-entity/add-service-entity.component';
import { UpdateServiceEntityComponent } from './service-entity/update-service-entity/update-service-entity.component';
import { AddTimeslotComponent } from './timeslot/add-timeslot/add-timeslot.component';
import { UpdateTimeslotComponent } from './timeslot/update-timeslot/update-timeslot.component';
import { AddTripTypeComponent } from './trip-type/add-trip-type/add-trip-type.component';
import { UpdateTripTypeComponent } from './trip-type/update-trip-type/update-trip-type.component';
import { AddUserTypeComponent } from './user-type/add-user-type/add-user-type.component';
import { UpdateUserTypeComponent } from './user-type/update-user-type/update-user-type.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetComponent } from './reset/reset.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { AddVehicleComponent } from './vehicle/add-vehicle/add-vehicle.component';
import { EditVehicleComponent } from './vehicle/edit-vehicle/edit-vehicle.component';
import { InspectionComponent } from './inspection/inspection.component';
import { AddInspectionComponent } from './inspection/add-inspection/add-inspection.component';
import { TrailerComponent } from './trailer/trailer.component';
import { AddTrailerComponent } from './trailer/add-trailer/add-trailer.component';
import { EditTrailerComponent } from './trailer/edit-trailer/edit-trailer.component';
import { QuotationComponent } from './quotation/quotation.component';
import { AddQuotationComponent } from './quotation/add-quotation/add-quotation.component';
import { TravelPackageComponent } from './travelpackage/travelpackage.component';
import { EditTravelComponent } from './travelpackage/edit-travelpackage/edit-travelpackage.component';
import { RefundComponent } from './refund/refund.component';
import { AddRefundComponent } from './refund/add-refund/add-refund.component';
import { PassengersComponent } from './passengers/passengers.component';
//import { AddPassengersComponent } from './passengers/add-passengers/add-passengers.component';
import { NotificationComponent } from './passengers/add-passengers/notification/notification.component';
import { UpdatePassengersComponent } from './passengers/update-passengers/update-passengers.component';
import { RentalApplicationComponent } from './rental-application/rental-application.component';
import { ClientViewRentalApplicationComponent } from './rental-application/client-view-rental-application/client-view-rental-application.component';
import { RentalProductsComponent } from './rental-application/rental-products/rental-products.component';
import { ViewRentalApplicationComponent } from './rental-application/view-rental-application/view-rental-application.component';
 import { BookingControllerComponent } from './booking-controller/booking-controller.component';
import { ShuttleBookingComponent } from './booking-controller/shuttle-booking/shuttle-booking.component';
import { ViewBookingComponent } from './booking-controller/view-booking/view-booking.component';
import { DiscountComponent } from './discount/discount.component';
import { MakePaymentComponent } from './booking-controller/make-payment/make-payment.component';
import { EditDiscountComponent } from './discount/edit-discount/edit-discount.component';
import { AddDiscountComponent } from './discount/add-discount/add-discount.component';
import { PayfastCheckOutComponent } from './booking-controller/payfast-check-out/payfast-check-out.component';
import { SuccessComponent } from './success/success.component';
import { CancelComponent } from './cancel/cancel.component';
//import { BookingReportsComponent } from './booking-reports/booking-reports.component';
import { ReportsComponent } from './reports/reports.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BookingReportsComponent } from './reports/booking-reports/booking-reports.component';
import { PrintButtonComponent } from './reports/print-button/print-button.component';
import { VehicleInspectionListComponent } from './vehicle-inspection-list/vehicle-inspection-list.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin/admin-register/admin-register.component';
//import { RefundListReportComponent } from './reports/refund-list-report/refund-list-report/refund-list-report.component';
import { RefundReportComponent } from './refund-list-report/refund-report/refund-report.component';
import { RentalPaymentReportComponent } from './rental-payments-report/rental-payments-report.component';
import { CreateVehicleRentalApplicationComponent } from './rental-application/create-vehicle-rental-application/create-vehicle-rental-application.component';
import { PayRentalApplicationComponent } from './rental-application/pay-rental-application/pay-rental-application.component';
import { PaymentCompleteComponent } from './rental-application/payment-complete/payment-complete.component';
import { VehicleRentalListComponent } from './rental-application/vehicle-rental-list/vehicle-rental-list.component';
//import { RefundListComponent } from './report/refund-list/refund-list.component';






@NgModule({
  declarations: [
    AppComponent,
    EmployeeTypeComponent,
    AddEmployeeTypeComponent,
    UpdateEmployeeTypeComponent,
    TripTypeComponent,
    TimeslotComponent,
    UserTypeComponent,
    EmployeeComponent,
    DriverComponent,
    BookingTypeComponent,
    ServiceEntityComponent,
    AddDriverComponent,
    UpdateDriverComponent,
    AddBookingTypeComponent,
    UpdateBookingTypeComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
    AddServiceEntityComponent,
    UpdateServiceEntityComponent,
    AddTimeslotComponent,
    UpdateTimeslotComponent,
    AddTripTypeComponent,
    UpdateTripTypeComponent,
    AddUserTypeComponent,
    UpdateUserTypeComponent,
    LoginComponent,
    RegisterComponent,
    ResetComponent,
    VehicleComponent,
    AddVehicleComponent,
    EditVehicleComponent,
    InspectionComponent,
    AddInspectionComponent,
    TrailerComponent,
    AddTrailerComponent,
    EditTrailerComponent,
    QuotationComponent,
    AddQuotationComponent,
    TravelPackageComponent,
    TravelPackageComponent,
    TravelPackageComponent,
    RefundComponent,
    AddRefundComponent,
    PassengersComponent,
    //AddPassengersComponent,
    NotificationComponent,
    UpdatePassengersComponent,
    RentalApplicationComponent,
    ClientViewRentalApplicationComponent,
    RentalProductsComponent,
    ViewRentalApplicationComponent,
    BookingControllerComponent,
    ShuttleBookingComponent,
    ViewBookingComponent,
    DiscountComponent,
    MakePaymentComponent,
    EditDiscountComponent,
    AddDiscountComponent,
    PayfastCheckOutComponent,
    SuccessComponent,
    CancelComponent,
   // BookingReportsComponent,
    ReportsComponent,
    BookingReportsComponent,
    PrintButtonComponent,
    VehicleInspectionListComponent,
    AdminLoginComponent,
    AdminRegisterComponent,
    //RefundListReportComponent,
    RefundReportComponent,
    RentalPaymentReportComponent,
    CreateVehicleRentalApplicationComponent,
    PayRentalApplicationComponent,
    PaymentCompleteComponent,
    VehicleRentalListComponent,
    //RefundListComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatStepperModule,
    MatIconModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { UpdateEmployeeComponent } from './employee/update-employee/update-employee.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { EmployeeTypeComponent } from './employee-type/employee-type.component';
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
import { EmployeeGuard } from './shared/employee.guard';
import { OwnerViewRentalApplicationComponent } from './rental-application/owner-view-rental-application/owner-view-rental-application.component';
import { ReviewApplicationComponent } from './rental-application/review-application/review-application.component';
import { ViewOwnerSideComponent } from './rental-application/view-owner-side/view-owner-side.component';
import { AddManualComponent } from './help/help-manual/add-manual/add-manual.component';
import { EditManualComponent } from './help/help-manual/edit-manual/edit-manual.component';
import { HelpManualComponent } from './help/help-manual/help-manual.component';
import { ClientHelpComponent } from './client-help/client-help.component';
import { AddQuotationComponent } from './quotation/add-quotation/add-quotation.component';
import { SalesGraphComponent } from './reports/sales-graph/sales-graph.component';
import { CheckPassengersComponent } from './driver/check-passengers/check-passengers.component';
import { AddCategoryComponent } from './help/help-category/add-category/add-category.component';
import { HelpCategoryComponent } from './help/help-category/help-category.component';
import { EditCategoryComponent } from './help/help-category/edit-category/edit-category.component';
import { EmployeeTypeComponent } from './employee-type/employee-type.component';
import { TrailerTypeComponent } from './trailer/trailer-type/trailer-type.component';
import { TrailerInspectionComponent } from './trailer/trailer-inspection/trailer-inspection.component';
import { AddTrailerInspectionComponent } from './trailer/trailer-inspection/add-trailer-inspection/add-trailer-inspection.component';
import { AddTrailerTypeComponent } from './trailer/trailer-type/add-trailer-type/add-trailer-type.component';
import { EditTrailerTypeComponent } from './trailer/trailer-type/edit-trailer-type/edit-trailer-type.component';
import { LicenseCodeComponent } from './driver/license-code/license-code.component';
import { AddLicenseCodeComponent } from './driver/license-code/add-license-code/add-license-code.component';
import { EditLicenseCodeComponent } from './driver/license-code/edit-license-code/edit-license-code.component';
import { RentalProductsReportComponent } from './rental-application/rental-products-report/rental-products-report.component';
import { TravepackageBookingComponent } from './booking-controller/travepackage-booking/travepackage-booking.component';
import { HomeClientComponent } from './home-client/home-client.component';
import { AboutComponent } from './about/about.component';
import { AuditLog } from './shared/auditLog';
import { AuditLogComponent } from './audit-log/audit-log.component';
import { NavScreenComponent } from './rental-application/nav-screen/nav-screen.component';


const routes: Routes = [
  {path: 'employee-type', component:EmployeeComponent, canActivate:[EmployeeGuard]},
  {path:'employee-type/:id', component:UpdateEmployeeTypeComponent, canActivate:[EmployeeGuard]},
  {path:'update-user-type/:UserTypeID',component:UpdateUserTypeComponent, canActivate:[EmployeeGuard]},
  {path:'timeslot/:timeslotID',component:UpdateTimeslotComponent, canActivate:[EmployeeGuard]},
  {path:'trip-type/:tripTypeID',component:UpdateTripTypeComponent, canActivate:[EmployeeGuard]},
  {path:'employee/:id',component:UpdateEmployeeComponent, canActivate:[EmployeeGuard]},
  {path:'service/:id',component:UpdateServiceEntityComponent, canActivate:[EmployeeGuard]},
  {path: 'add-employee-type', component: AddEmployeeTypeComponent, canActivate:[EmployeeGuard]},
  {path: 'driver', component: DriverComponent, canActivate:[EmployeeGuard]},
  {path:'add-driver',component:AddDriverComponent, canActivate:[EmployeeGuard]},
  {path:'driver/:id',component:UpdateDriverComponent, canActivate:[EmployeeGuard]},
  {path: 'booking-type', component: BookingTypeComponent, canActivate:[EmployeeGuard]},
  {path:'add-booking-type', component:AddBookingTypeComponent, canActivate:[EmployeeGuard]},
  {path:'update-booking-type/:bookingTypeID',component:UpdateBookingTypeComponent, canActivate:[EmployeeGuard]},
  {path: 'trip-type', component: TripTypeComponent, canActivate:[EmployeeGuard]},
  {path: 'service-entity', component: ServiceEntityComponent, canActivate:[EmployeeGuard]},
  {path: 'user-type', component: UserTypeComponent, canActivate:[EmployeeGuard]},
  {path: 'employee', component: EmployeeComponent, canActivate:[EmployeeGuard]},
  {path: 'timeslot', component: TimeslotComponent, canActivate:[EmployeeGuard]},
  {path: 'add-employee', component: AddEmployeeComponent, canActivate:[EmployeeGuard]},
  {path: 'add-service-entity', component: AddServiceEntityComponent, canActivate:[EmployeeGuard]},
  {path: 'add-timeslot', component: AddTimeslotComponent, canActivate:[EmployeeGuard]},
  {path: 'add-trip-type', component: AddTripTypeComponent, canActivate:[EmployeeGuard]},
  {path: 'add-user-type', component: AddUserTypeComponent, canActivate:[EmployeeGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset', component: ResetComponent},
  {path: 'vehicle', component: VehicleComponent, canActivate:[EmployeeGuard]},
  {path: 'add-vehicle', component: AddVehicleComponent, canActivate:[EmployeeGuard]},
  {path: 'edit-vehicle/:vehicleID', component: EditVehicleComponent, canActivate:[EmployeeGuard]},
  {path: 'inspection', component: InspectionComponent, canActivate:[EmployeeGuard]},
  {path: 'add-inspection', component: AddInspectionComponent, canActivate:[EmployeeGuard]},
  {path: 'add-trailer', component: AddTrailerComponent, canActivate:[EmployeeGuard]},
  {path: 'edit-trailer/:trailerID', component: EditTrailerComponent, canActivate:[EmployeeGuard]},
  {path: 'trailer', component: TrailerComponent, canActivate:[EmployeeGuard]},
  {path: 'quotation', component: QuotationComponent},
  {path: 'travelpackage', component: TravelPackageComponent},
  {path: 'add-travelpackage', component:AddTravelPackageComponent},
  {path: 'refund', component: RefundComponent, canActivate:[AuthGuard]},
  {path: 'add-refund', component: AddRefundComponent},
  {path: 'passengers', component: PassengersComponent},
  //{path:'AddPassenger', component:AddPassengersComponent},
  {path:'passenger/:id', component:UpdatePassengersComponent, canActivate:[AuthGuard]},
  {path:'rental-application/:trailerID/:size/:registrationNumber/:rentalPrice/:trailerType', component:RentalApplicationComponent},
  {path:'Vrental-application/:vehicleID/:vehicleName/:registrationNumber/:vehiclePriceID/:vehicleType', component:CreateVehicleRentalApplicationComponent, canActivate:[AuthGuard]},
  {path:'rentalProducts', component:RentalProductsComponent},
  {path:'rental-applications',component:ClientViewRentalApplicationComponent},
  {path:'rental-products-list', component:RentalProductsReportComponent},
 
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
  {path: 'vehicle-rental-list', component:VehicleRentalListComponent},
  {path:'owner-view', component: OwnerViewRentalApplicationComponent,canActivate:[EmployeeGuard]},
  {path:'review/:rentalId', component: ReviewApplicationComponent,canActivate:[EmployeeGuard]},
  {path:'view/:rentalId',component:ViewOwnerSideComponent,canActivate:[EmployeeGuard]},
  {path:'add-manual', component:AddManualComponent},
  {path:'edit-manual/:helpID', component:EditManualComponent},
  {path:'help-manual', component:HelpManualComponent},
  {path:'client-help', component:ClientHelpComponent},
  {path:'edit-employee', component:UpdateEmployeeComponent},
  {path:'edit-service-entity', component:UpdateServiceEntityComponent},
  {path:'quotation', component:QuotationComponent},
  {path:'add-quotation', component:AddQuotationComponent},
  {path: 'sales-graph', component:SalesGraphComponent},
{path:'check-passengers', component: CheckPassengersComponent},
{path:'add-category', component:AddCategoryComponent},
{path:'help-category', component:HelpCategoryComponent},
{path:'edit-category/:categoryID', component:EditCategoryComponent},
{path:'employee-type', component:EmployeeTypeComponent},
{path:'trailer-type',component:TrailerTypeComponent},
{path:'trailer-inspection',component:TrailerInspectionComponent},
{path:'add-trailer-inspection/:trailerID',component:AddTrailerInspectionComponent},
{path:'add-trailer-type',component:AddTrailerTypeComponent},
{path:'edit-trailer-type/:trailerTypeID',component:EditTrailerTypeComponent},
{path:'license-code', component:LicenseCodeComponent},
{path:'add-license-code',component:AddLicenseCodeComponent},
{path:'edit-license-code/:licenseCodeID',component:EditLicenseCodeComponent},
{path:'travepackage-booking', component:TravepackageBookingComponent},
{path:'home-client', component:HomeClientComponent},
{path:'about',component:AboutComponent},
{path:'auditLog',component:AuditLogComponent},
{path:'rentalNavigation', component:NavScreenComponent}


  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

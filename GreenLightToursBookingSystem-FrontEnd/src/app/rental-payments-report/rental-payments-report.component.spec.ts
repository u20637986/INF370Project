import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalPaymentsReportComponent } from './rental-payments-report.component';

describe('RentalPaymentsReportComponent', () => {
  let component: RentalPaymentsReportComponent;
  let fixture: ComponentFixture<RentalPaymentsReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalPaymentsReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalPaymentsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

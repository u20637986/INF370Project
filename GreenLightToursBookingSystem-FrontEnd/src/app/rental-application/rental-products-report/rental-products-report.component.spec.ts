import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalProductsReportComponent } from './rental-products-report.component';

describe('RentalProductsReportComponent', () => {
  let component: RentalProductsReportComponent;
  let fixture: ComponentFixture<RentalProductsReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentalProductsReportComponent]
    });
    fixture = TestBed.createComponent(RentalProductsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

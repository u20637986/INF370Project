import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayRentalApplicationComponent } from './pay-rental-application.component';

describe('PayRentalApplicationComponent', () => {
  let component: PayRentalApplicationComponent;
  let fixture: ComponentFixture<PayRentalApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayRentalApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayRentalApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

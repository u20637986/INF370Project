import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShuttleBookingComponent } from './shuttle-booking.component';

describe('ShuttleBookingComponent', () => {
  let component: ShuttleBookingComponent;
  let fixture: ComponentFixture<ShuttleBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShuttleBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShuttleBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

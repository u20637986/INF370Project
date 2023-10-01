import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravepackageBookingComponent } from './travepackage-booking.component';

describe('TravepackageBookingComponent', () => {
  let component: TravepackageBookingComponent;
  let fixture: ComponentFixture<TravepackageBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravepackageBookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravepackageBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

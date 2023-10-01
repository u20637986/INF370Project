import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBookingTypeComponent } from './update-booking-type.component';

describe('UpdateBookingTypeComponent', () => {
  let component: UpdateBookingTypeComponent;
  let fixture: ComponentFixture<UpdateBookingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateBookingTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateBookingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

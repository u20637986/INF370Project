import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingControllerComponent } from './booking-controller.component';

describe('BookingControllerComponent', () => {
  let component: BookingControllerComponent;
  let fixture: ComponentFixture<BookingControllerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookingControllerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookingControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

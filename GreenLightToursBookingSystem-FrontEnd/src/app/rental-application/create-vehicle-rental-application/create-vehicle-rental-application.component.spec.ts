import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVehicleRentalApplicationComponent } from './create-vehicle-rental-application.component';

describe('CreateVehicleRentalApplicationComponent', () => {
  let component: CreateVehicleRentalApplicationComponent;
  let fixture: ComponentFixture<CreateVehicleRentalApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateVehicleRentalApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateVehicleRentalApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

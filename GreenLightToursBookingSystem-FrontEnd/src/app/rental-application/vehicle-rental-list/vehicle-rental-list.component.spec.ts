import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRentalListComponent } from './vehicle-rental-list.component';

describe('VehicleRentalListComponent', () => {
  let component: VehicleRentalListComponent;
  let fixture: ComponentFixture<VehicleRentalListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleRentalListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleRentalListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

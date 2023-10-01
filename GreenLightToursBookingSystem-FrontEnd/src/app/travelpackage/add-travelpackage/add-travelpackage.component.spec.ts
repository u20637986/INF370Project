import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTravelPackageComponent } from './add-travelpackage.component';

describe('AddTravelPackageComponent', () => {
  let component: AddTravelPackageComponent;
  let fixture: ComponentFixture<AddTravelPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTravelPackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTravelPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

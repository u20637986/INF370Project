import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTravelpackageComponent } from './add-travelpackage.component';

describe('AddTravelpackageComponent', () => {
  let component: AddTravelpackageComponent;
  let fixture: ComponentFixture<AddTravelpackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTravelpackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTravelpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

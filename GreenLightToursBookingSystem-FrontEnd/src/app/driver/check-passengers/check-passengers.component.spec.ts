import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPassengersComponent } from './check-passengers.component';

describe('CheckPassengersComponent', () => {
  let component: CheckPassengersComponent;
  let fixture: ComponentFixture<CheckPassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckPassengersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckPassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

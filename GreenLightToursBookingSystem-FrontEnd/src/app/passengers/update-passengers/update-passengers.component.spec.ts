import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePassengersComponent } from './update-passengers.component';

describe('UpdatePassengersComponent', () => {
  let component: UpdatePassengersComponent;
  let fixture: ComponentFixture<UpdatePassengersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePassengersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdatePassengersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

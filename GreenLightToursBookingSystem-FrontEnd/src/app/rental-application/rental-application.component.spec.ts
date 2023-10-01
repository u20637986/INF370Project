import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalApplicationComponent } from './rental-application.component';

describe('RentalApplicationComponent', () => {
  let component: RentalApplicationComponent;
  let fixture: ComponentFixture<RentalApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentalApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentalApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRentalApplicationComponent } from './view-rental-application.component';

describe('ViewRentalApplicationComponent', () => {
  let component: ViewRentalApplicationComponent;
  let fixture: ComponentFixture<ViewRentalApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRentalApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRentalApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

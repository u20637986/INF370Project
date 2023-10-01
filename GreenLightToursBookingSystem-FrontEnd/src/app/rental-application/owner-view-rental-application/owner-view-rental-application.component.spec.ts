import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerViewRentalApplicationComponent } from './owner-view-rental-application.component';

describe('OwnerViewRentalApplicationComponent', () => {
  let component: OwnerViewRentalApplicationComponent;
  let fixture: ComponentFixture<OwnerViewRentalApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerViewRentalApplicationComponent]
    });
    fixture = TestBed.createComponent(OwnerViewRentalApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientViewRentalApplicationComponent } from './client-view-rental-application.component';

describe('ClientViewRentalApplicationComponent', () => {
  let component: ClientViewRentalApplicationComponent;
  let fixture: ComponentFixture<ClientViewRentalApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientViewRentalApplicationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientViewRentalApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

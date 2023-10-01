import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTravelpackageComponent } from './edit-travelpackage.component';

describe('EditTravelpackageComponent', () => {
  let component: EditTravelpackageComponent;
  let fixture: ComponentFixture<EditTravelpackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTravelpackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTravelpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

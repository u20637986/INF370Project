import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTripTypeComponent } from './add-trip-type.component';

describe('AddTripTypeComponent', () => {
  let component: AddTripTypeComponent;
  let fixture: ComponentFixture<AddTripTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTripTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTripTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

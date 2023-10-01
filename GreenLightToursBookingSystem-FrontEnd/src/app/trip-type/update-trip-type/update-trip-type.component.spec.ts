import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTripTypeComponent } from './update-trip-type.component';

describe('UpdateTripTypeComponent', () => {
  let component: UpdateTripTypeComponent;
  let fixture: ComponentFixture<UpdateTripTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateTripTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateTripTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

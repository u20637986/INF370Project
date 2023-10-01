import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrailerInspectionComponent } from './add-trailer-inspection.component';

describe('AddTrailerInspectionComponent', () => {
  let component: AddTrailerInspectionComponent;
  let fixture: ComponentFixture<AddTrailerInspectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrailerInspectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTrailerInspectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

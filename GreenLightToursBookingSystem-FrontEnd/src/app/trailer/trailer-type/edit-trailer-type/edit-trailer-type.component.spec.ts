import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTrailerTypeComponent } from './edit-trailer-type.component';

describe('EditTrailerTypeComponent', () => {
  let component: EditTrailerTypeComponent;
  let fixture: ComponentFixture<EditTrailerTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTrailerTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTrailerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

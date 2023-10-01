import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLicenseCodeComponent } from './edit-license-code.component';

describe('EditLicenseCodeComponent', () => {
  let component: EditLicenseCodeComponent;
  let fixture: ComponentFixture<EditLicenseCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLicenseCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLicenseCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

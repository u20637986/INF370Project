import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLicenseCodeComponent } from './add-license-code.component';

describe('AddLicenseCodeComponent', () => {
  let component: AddLicenseCodeComponent;
  let fixture: ComponentFixture<AddLicenseCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLicenseCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLicenseCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

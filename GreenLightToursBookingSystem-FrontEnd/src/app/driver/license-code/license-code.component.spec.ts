import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseCodeComponent } from './license-code.component';

describe('LicenseCodeComponent', () => {
  let component: LicenseCodeComponent;
  let fixture: ComponentFixture<LicenseCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

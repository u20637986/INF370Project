import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserTypeComponent } from './update-user-type.component';

describe('UpdateUserTypeComponent', () => {
  let component: UpdateUserTypeComponent;
  let fixture: ComponentFixture<UpdateUserTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUserTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

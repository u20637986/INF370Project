import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddServiceEntityComponent } from './add-service-entity.component';

describe('AddServiceEntityComponent', () => {
  let component: AddServiceEntityComponent;
  let fixture: ComponentFixture<AddServiceEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddServiceEntityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddServiceEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

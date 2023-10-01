import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceEntityComponent } from './service-entity.component';

describe('ServiceEntityComponent', () => {
  let component: ServiceEntityComponent;
  let fixture: ComponentFixture<ServiceEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceEntityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

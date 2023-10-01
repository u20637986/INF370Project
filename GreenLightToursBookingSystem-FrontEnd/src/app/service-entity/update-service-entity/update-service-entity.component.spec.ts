import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateServiceEntityComponent } from './update-service-entity.component';

describe('UpdateServiceEntityComponent', () => {
  let component: UpdateServiceEntityComponent;
  let fixture: ComponentFixture<UpdateServiceEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateServiceEntityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateServiceEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

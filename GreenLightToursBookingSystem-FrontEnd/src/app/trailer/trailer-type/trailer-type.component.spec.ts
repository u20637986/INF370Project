import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerTypeComponent } from './trailer-type.component';

describe('TrailerTypeComponent', () => {
  let component: TrailerTypeComponent;
  let fixture: ComponentFixture<TrailerTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrailerTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrailerTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelpackageComponent } from './travelpackage.component';

describe('TravelpackageComponent', () => {
  let component: TravelpackageComponent;
  let fixture: ComponentFixture<TravelpackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelpackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelpackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

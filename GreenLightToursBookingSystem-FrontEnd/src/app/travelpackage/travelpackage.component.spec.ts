import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPackageComponent } from './travelpackage.component';

describe('TravelpackageComponent', () => {
  let component: TravelPackageComponent;
  let fixture: ComponentFixture<TravelPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TravelPackageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

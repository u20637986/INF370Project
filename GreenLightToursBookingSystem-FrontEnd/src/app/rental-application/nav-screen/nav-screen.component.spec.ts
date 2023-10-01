import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavScreenComponent } from './nav-screen.component';

describe('NavScreenComponent', () => {
  let component: NavScreenComponent;
  let fixture: ComponentFixture<NavScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavScreenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

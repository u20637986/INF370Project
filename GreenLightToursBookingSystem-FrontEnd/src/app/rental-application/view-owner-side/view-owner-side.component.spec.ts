import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOwnerSideComponent } from './view-owner-side.component';

describe('ViewOwnerSideComponent', () => {
  let component: ViewOwnerSideComponent;
  let fixture: ComponentFixture<ViewOwnerSideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOwnerSideComponent]
    });
    fixture = TestBed.createComponent(ViewOwnerSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

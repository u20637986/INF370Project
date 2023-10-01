import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewApplicationComponent } from './review-application.component';

describe('ReviewApplicationComponent', () => {
  let component: ReviewApplicationComponent;
  let fixture: ComponentFixture<ReviewApplicationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReviewApplicationComponent]
    });
    fixture = TestBed.createComponent(ReviewApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

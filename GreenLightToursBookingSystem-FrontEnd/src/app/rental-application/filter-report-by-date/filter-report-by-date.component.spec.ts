import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterReportByDateComponent } from './filter-report-by-date.component';

describe('FilterReportByDateComponent', () => {
  let component: FilterReportByDateComponent;
  let fixture: ComponentFixture<FilterReportByDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterReportByDateComponent]
    });
    fixture = TestBed.createComponent(FilterReportByDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

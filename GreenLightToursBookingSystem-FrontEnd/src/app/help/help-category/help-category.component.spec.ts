import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpCategoryComponent } from './help-category.component';

describe('HelpCategoryComponent', () => {
  let component: HelpCategoryComponent;
  let fixture: ComponentFixture<HelpCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

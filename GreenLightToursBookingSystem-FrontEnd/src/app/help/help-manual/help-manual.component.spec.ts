import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpManualComponent } from './help-manual.component';

describe('HelpManualComponent', () => {
  let component: HelpManualComponent;
  let fixture: ComponentFixture<HelpManualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HelpManualComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

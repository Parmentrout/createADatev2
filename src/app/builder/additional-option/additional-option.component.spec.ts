import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalOptionComponent } from './additional-option.component';

describe('AdditionalOptionComponent', () => {
  let component: AdditionalOptionComponent;
  let fixture: ComponentFixture<AdditionalOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstOptionComponent } from './first-option.component';

describe('FirstOptionComponent', () => {
  let component: FirstOptionComponent;
  let fixture: ComponentFixture<FirstOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

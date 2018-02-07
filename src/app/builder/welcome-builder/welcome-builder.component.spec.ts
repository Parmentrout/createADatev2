import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeBuilderComponent } from './welcome-builder.component';

describe('WelcomeBuilderComponent', () => {
  let component: WelcomeBuilderComponent;
  let fixture: ComponentFixture<WelcomeBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

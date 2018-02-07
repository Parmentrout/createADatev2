import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartBuildComponent } from './start-build.component';

describe('StartBuildComponent', () => {
  let component: StartBuildComponent;
  let fixture: ComponentFixture<StartBuildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartBuildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

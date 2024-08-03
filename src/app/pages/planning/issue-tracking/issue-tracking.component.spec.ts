import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueTrackingComponent } from './issue-tracking.component';

describe('IssueTrackingComponent', () => {
  let component: IssueTrackingComponent;
  let fixture: ComponentFixture<IssueTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueTrackingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

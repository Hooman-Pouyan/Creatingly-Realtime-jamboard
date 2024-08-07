import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentFlowComponent } from './comment-flow.component';

describe('CommentFlowComponent', () => {
  let component: CommentFlowComponent;
  let fixture: ComponentFixture<CommentFlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentFlowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentFlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

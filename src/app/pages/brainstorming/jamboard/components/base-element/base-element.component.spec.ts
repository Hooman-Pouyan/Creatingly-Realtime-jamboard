import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseElementComponent } from './base-element.component';

describe('BaseElementComponent', () => {
  let component: BaseElementComponent;
  let fixture: ComponentFixture<BaseElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseElementComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BaseElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

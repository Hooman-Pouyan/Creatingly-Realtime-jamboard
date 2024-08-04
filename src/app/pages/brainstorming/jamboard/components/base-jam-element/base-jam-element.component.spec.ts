import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseJamElementComponent } from './base-jam-element.component';

describe('BaseJamElementComponent', () => {
  let component: BaseJamElementComponent;
  let fixture: ComponentFixture<BaseJamElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseJamElementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseJamElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

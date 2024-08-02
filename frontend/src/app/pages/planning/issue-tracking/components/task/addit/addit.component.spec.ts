import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditComponent } from './addit.component';

describe('AdditComponent', () => {
  let component: AdditComponent;
  let fixture: ComponentFixture<AdditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

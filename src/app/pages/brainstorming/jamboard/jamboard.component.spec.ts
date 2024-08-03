import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JamboardComponent } from './jamboard.component';

describe('JamboardComponent', () => {
  let component: JamboardComponent;
  let fixture: ComponentFixture<JamboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JamboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JamboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

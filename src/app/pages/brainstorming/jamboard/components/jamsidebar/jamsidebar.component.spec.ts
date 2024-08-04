import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JamsidebarComponent } from './jamsidebar.component';

describe('JamsidebarComponent', () => {
  let component: JamsidebarComponent;
  let fixture: ComponentFixture<JamsidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JamsidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JamsidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

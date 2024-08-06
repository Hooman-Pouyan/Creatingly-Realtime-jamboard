import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCursorComponent } from './user-cursor.component';

describe('UserCursorComponent', () => {
  let component: UserCursorComponent;
  let fixture: ComponentFixture<UserCursorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCursorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCursorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

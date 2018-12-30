import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentsConfirmComponent } from './comments-confirm.component';

describe('CommentsConfirmComponent', () => {
  let component: CommentsConfirmComponent;
  let fixture: ComponentFixture<CommentsConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommentsConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

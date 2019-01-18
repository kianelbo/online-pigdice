import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayAiComponent } from './play-ai.component';

describe('PlayAiComponent', () => {
  let component: PlayAiComponent;
  let fixture: ComponentFixture<PlayAiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayAiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

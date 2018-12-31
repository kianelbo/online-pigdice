import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayPageComponent } from './play-page.component';

describe('PlayPageComponent', () => {
  let component: PlayPageComponent;
  let fixture: ComponentFixture<PlayPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

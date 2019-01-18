import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayStatsComponent } from './play-stats.component';

describe('PlayStatsComponent', () => {
  let component: PlayStatsComponent;
  let fixture: ComponentFixture<PlayStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

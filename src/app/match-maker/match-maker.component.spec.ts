import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchMakerComponent } from './match-maker.component';

describe('MatchMakerComponent', () => {
  let component: MatchMakerComponent;
  let fixture: ComponentFixture<MatchMakerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchMakerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchMakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

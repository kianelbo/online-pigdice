import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignStatsComponent } from './design-stats.component';

describe('DesignStatsComponent', () => {
  let component: DesignStatsComponent;
  let fixture: ComponentFixture<DesignStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

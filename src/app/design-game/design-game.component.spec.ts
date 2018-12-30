import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignGameComponent } from './design-game.component';

describe('DesignGameComponent', () => {
  let component: DesignGameComponent;
  let fixture: ComponentFixture<DesignGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignGameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

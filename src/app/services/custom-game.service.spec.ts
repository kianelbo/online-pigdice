import { TestBed } from '@angular/core/testing';

import { CustomGameService } from './custom-game.service';

describe('CustomGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomGameService = TestBed.get(CustomGameService);
    expect(service).toBeTruthy();
  });
});

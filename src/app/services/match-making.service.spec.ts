import { TestBed } from '@angular/core/testing';

import { MatchMakingService } from './match-making.service';

describe('MatchMakingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatchMakingService = TestBed.get(MatchMakingService);
    expect(service).toBeTruthy();
  });
});

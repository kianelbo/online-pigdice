import { TestBed } from '@angular/core/testing';

import { FriendshipService } from './friendship.service';

describe('FriendshipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FriendshipService = TestBed.get(FriendshipService);
    expect(service).toBeTruthy();
  });
});

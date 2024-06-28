import { TestBed } from '@angular/core/testing';

import { UserDataManagerService } from './user-data-manager.service';

describe('UserDataManagerService', () => {
  let service: UserDataManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDataManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

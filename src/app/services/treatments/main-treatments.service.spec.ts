import { TestBed } from '@angular/core/testing';

import { MainTreatmentsService } from './main-treatments.service';

describe('MainTreatmentsService', () => {
  let service: MainTreatmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MainTreatmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

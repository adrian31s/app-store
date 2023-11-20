import { TestBed } from '@angular/core/testing';

import { ObjectReceiverService } from './object-receiver.service';

describe('ObjectReceiverService', () => {
  let service: ObjectReceiverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectReceiverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

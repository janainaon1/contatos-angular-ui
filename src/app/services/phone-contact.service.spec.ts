import { TestBed } from '@angular/core/testing';

import { PhoneContactService } from './phone-contact.service';

describe('PhoneContactService', () => {
  let service: PhoneContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhoneContactService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { CommandetransService } from './commandetrans.service';

describe('CommandetransService', () => {
  let service: CommandetransService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandetransService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

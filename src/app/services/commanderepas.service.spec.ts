import { TestBed } from '@angular/core/testing';

import { CommanderepasService } from './commanderepas.service';

describe('CommanderepasService', () => {
  let service: CommanderepasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommanderepasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

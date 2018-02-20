import { TestBed, inject } from '@angular/core/testing';

import { DetalhesService } from './detalhes.service';

describe('DetalhesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetalhesService]
    });
  });

  it('should be created', inject([DetalhesService], (service: DetalhesService) => {
    expect(service).toBeTruthy();
  }));
});

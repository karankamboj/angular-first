import { TestBed } from '@angular/core/testing';

import { GetBlogsService } from './get-blogs.service';

describe('GetBlogsService', () => {
  let service: GetBlogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBlogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

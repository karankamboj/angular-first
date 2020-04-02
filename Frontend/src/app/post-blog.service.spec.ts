import { TestBed } from '@angular/core/testing';

import { PostBlogService } from './post-blog.service';

describe('PostBlogService', () => {
  let service: PostBlogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostBlogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

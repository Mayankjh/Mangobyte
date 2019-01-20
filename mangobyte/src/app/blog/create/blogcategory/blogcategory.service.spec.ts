import { TestBed } from '@angular/core/testing';

import { BlogcategoryService } from './blogcategory.service';

describe('BlogcategoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlogcategoryService = TestBed.get(BlogcategoryService);
    expect(service).toBeTruthy();
  });
});

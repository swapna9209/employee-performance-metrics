import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientTestingModule], providers: [ApiService] });
    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should return mocked employees', (done) => {
    service.getEmployees().subscribe(list => {
      expect(Array.isArray(list)).toBeTrue();
      expect(list.length).toBeGreaterThan(0);
      done();
    });
    // Because getEmployees uses of(mock).pipe(...) there's no http request here.
  });

  it('should throw on server error (using getEmployeesWithError)', (done) => {
    service.getEmployeesWithError().subscribe({
      next: () => fail('should not succeed'),
      error: (err) => {
        expect(err).toBeTruthy();
        done();
      }
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { StateService } from './state.service';
import { ApiService } from './api.service';
import { of, throwError } from 'rxjs';
import { ErrorService } from './error.service';

describe('StateService', () => {
  let service: StateService;
  let apiSpy: Partial<ApiService>;
  let errorService: ErrorService;

  beforeEach(() => {
    apiSpy = {
      getEmployees: () => of([{ id: 'e1', name: 'A', role: 'Dev', department: 'X', performance: 10 }])
    };
    TestBed.configureTestingModule({
      providers: [
        StateService,
        ErrorService,
        { provide: ApiService, useValue: apiSpy }
      ]
    });
    service = TestBed.inject(StateService);
    errorService = TestBed.inject(ErrorService);
  });

  it('loadEmployees sets employees in subject and signal', (done) => {
    service.loadEmployees().subscribe(list => {
      expect(list.length).toBe(1);
      const sig = service.employeesSignal();
      expect(sig.length).toBe(1);
      done();
    });
  });

  it('handles error from API', (done) => {
    (apiSpy.getEmployees as any) = () => throwError(() => new Error('boom'));
    service.loadEmployees().subscribe({
      next: () => fail('should error'),
      error: () => {
        service.errorService?.errors$?.subscribe(msg => {
          // errorService set is done in catchError
          // Note: could also directly inject and assert
        });
        done();
      }
    });
  });
});

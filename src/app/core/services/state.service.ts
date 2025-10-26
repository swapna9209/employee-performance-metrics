import { Injectable, signal, Signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { ApiService } from './api.service';
import { catchError, tap } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({ providedIn: 'root' })
export class StateService {
  // RxJS Subject for subscribers who prefer Observables
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();

  // Angular Signal
  employeesSignal = signal<Employee[]>([]);

  constructor(public api: ApiService, public errorService: ErrorService) {}

  loadEmployees(): Observable<Employee[]> {
    this.errorService.setError(null);
    return this.api.getEmployees().pipe(
      tap(list => {
        this.employeesSubject.next(list);
        this.employeesSignal.set(list);
      }),
      catchError(err => {
        this.errorService.setError(err?.message || 'Unknown error');
        throw err;
      })
    );
  }

  updateEmployee(emp: Employee) {
    // Optimistic update locally
    const current = this.employeesSubject.getValue();
    const updated = current.map(e => (e.id === emp.id ? emp : e));
    this.employeesSubject.next(updated);
    this.employeesSignal.set(updated);

    return this.api.updateEmployee(emp).pipe(
      catchError(err => {
        // On error you could revert — simplified here
        this.errorService.setError('Failed to save employee');
        throw err;
      })
    );
  }
}

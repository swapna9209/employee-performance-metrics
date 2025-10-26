import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../models/employee.model';
import { Observable, of, throwError } from 'rxjs';
import { delay, catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ApiService {
  // In real app replace with actual endpoint
  private readonly endpoint = '/api/employees';

  constructor(private http: HttpClient) {}

  // Mock: returns a list of employees after a delay
  getEmployees(): Observable<Employee[]> {
    const mock: Employee[] = [
      { id: 'e1', name: 'Alice Kumar', role: 'Developer', department: 'Engineering', performance: 82, lastReviewDate: '2025-06-01' },
      { id: 'e2', name: 'Rahul Singh', role: 'QA', department: 'Quality', performance: 74, lastReviewDate: '2025-05-20' },
      { id: 'e3', name: 'Priya Sharma', role: 'Manager', department: 'Product', performance: 91, lastReviewDate: '2025-06-10' }
    ];
    // Simulate network latency
    return of(mock).pipe(delay(400), catchError(err => throwError(() => new Error('Failed to load employees'))));
  }

  // Mock update
  updateEmployee(e: Employee): Observable<Employee> {
    // For mock return updated employee
    return of(e).pipe(delay(300));
  }

  // Simulate an error endpoint (used in tests)
  getEmployeesWithError(): Observable<Employee[]> {
    return throwError(() => new Error('Server error')).pipe(delay(200));
  }
}

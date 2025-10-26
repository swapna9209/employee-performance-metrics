import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private _errors = new BehaviorSubject<string | null>(null);
  readonly errors$ = this._errors.asObservable();

  setError(message: string | null) {
    this._errors.next(message);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  private searchIdSubject = new BehaviorSubject<number | null>(null);
  searchId$ = this.searchIdSubject.asObservable();

  setSearchId(id: number) {
    this.searchIdSubject.next(id);
  }
}

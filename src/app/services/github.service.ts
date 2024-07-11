import { Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { GithubUser } from '../types/github-user';
import { HttpClient } from '@angular/common/http';
import { GithubUserSearchResponse } from '../types/github-user-search-response';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private _totalResults$ = new BehaviorSubject<number>(0);
  totalResults$ = this._totalResults$.asObservable();

  constructor(private http: HttpClient) { }

  getGithubUsers() {
    return this.http
      .get<GithubUserSearchResponse>('https://api.github.com/search/users')
      .pipe(
        tap((response) => {
          this._totalResults$.next(response.total_count);
        }),
        map((response) => response.items)
      );
  }
  
}

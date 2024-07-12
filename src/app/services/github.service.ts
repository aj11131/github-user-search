import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, iif, map, Observable, shareReplay, switchMap, tap } from 'rxjs';
import { GithubUser } from '../types/github-user';
import { HttpClient } from '@angular/common/http';
import { GithubUserSearchResponse } from '../types/github-user-search-response';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private _searchString$ = new BehaviorSubject<string>('');
  searchString$ = this._searchString$.asObservable();

  private _totalResults$ = new BehaviorSubject<number>(0);
  totalResults$ = this._totalResults$.asObservable();

  githubUsers$ = combineLatest([this.searchString$]).pipe(
    switchMap(([searchString]) => {
      return iif(
        () => searchString?.trim()?.length > 0, 
        this.searchGithubUsers(searchString), 
        this.getGithubUsers());}
    ),
    shareReplay(1)
  );

  constructor(private http: HttpClient) { }

  searchGithubUsers(search: string): Observable<GithubUser[]> {
    return this.http
      .get<GithubUserSearchResponse>(
        'https://api.github.com/search/users',
        {params: {q: search}}
      )
      .pipe(
        tap((response) => {
          this._totalResults$.next(response.total_count);
        }),
        map((response) => response.items)
      );
  }

  getGithubUsers(): Observable<GithubUser[]> {
    return this.http
      .get<GithubUser[]>(
        'https://api.github.com/users'
      )
      .pipe(
        tap((response) => {
          this._totalResults$.next(-1);
        })
      );
  }

  setSearchString(searchString: string): void {
    this._searchString$.next(searchString);
  }
}

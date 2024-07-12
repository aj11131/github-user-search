import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, filter, iif, map, Observable, of, shareReplay, Subject, switchMap, tap } from 'rxjs';
import { GithubUser } from '../types/github-user';
import { HttpClient } from '@angular/common/http';
import { GithubUserSearchResponse } from '../types/github-user-search-response';
import { GithubUserDetails } from '../types/github-user-details';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private _searchParameters$ = new BehaviorSubject<{
    searchString: string;
    pageNumber: number;
  }>({searchString: '', pageNumber: 1});
  searchParameters$ = this._searchParameters$.asObservable();


  private _totalResults$ = new BehaviorSubject<number>(0);
  totalResults$ = this._totalResults$.asObservable();

  githubUsers$ = combineLatest([this.searchParameters$]).pipe(
    switchMap(([{pageNumber, searchString}]) => {
      return iif(
        () => searchString?.trim()?.length > 0, 
        this.searchGithubUsers(searchString, pageNumber), 
        this.getGithubUsers());}
    ),
    shareReplay(1)
  );

  private _selectedUserUsername$ = new BehaviorSubject<string>('');
  selectedUser$: Observable<GithubUserDetails> = this._selectedUserUsername$.asObservable().pipe(
    filter((username) => username.trim().length > 0),
    switchMap((username) => {
      return this.getGithubUser(username)
    })
  );

  constructor(private http: HttpClient) { }

  searchGithubUsers(search: string, page: number): Observable<GithubUser[]> {
    return this.http
      .get<GithubUserSearchResponse>(
        'https://api.github.com/search/users',
        {params: {q: search, page: page.toString()}}
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

  getGithubUser(username: string): Observable<GithubUserDetails> {
    return this.http
      .get<GithubUserDetails>(
        `https://api.github.com/users/${username}`
      );
  }

  setSearchParameters(searchParameters: Partial<{searchString: string, pageNumber: number}>): void {
    const currentValue = this._searchParameters$.getValue();
    this._searchParameters$.next({...currentValue, ...searchParameters});
  }
  
  setSelectedUser(username: string): void {
    console.log('setSelectedUser', username )
    this._selectedUserUsername$.next(username);
  }
}

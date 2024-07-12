import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { GithubUser } from '../../types/github-user';
import { GithubService } from '../../services/github.service';
import { UserRowComponent } from '../user-row/user-row.component';
import { AsyncPipe } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserRowComponent, AsyncPipe, NgbPaginationModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  data$!: Observable<{
    users: GithubUser[];
    totalResults: number;
    page: number;
    pageSize: number;
  }>;

  page: number = 1;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.data$ = combineLatest([
      this.githubService.githubUsers$, 
      this.githubService.totalResults$,
      this.githubService.searchParameters$
    ])
      .pipe(
        map(([users, totalResults, {pageNumber, pageSize}]) => ({users, totalResults, page: pageNumber, pageSize})),
        tap(({page}) => this.page = page)
      )
  }

  onPageChange(page: number) {
    this.githubService.setSearchParameters({pageNumber: page});
  }
}

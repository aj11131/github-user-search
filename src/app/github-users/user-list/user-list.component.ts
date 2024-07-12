import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { GithubUser } from '../../types/github-user';
import { GithubService } from '../../services/github.service';
import { UserRowComponent } from '../user-row/user-row.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [UserRowComponent, AsyncPipe],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  data$!: Observable<{
    users: GithubUser[];
  }>;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.data$ = combineLatest([this.githubService.githubUsers$])
      .pipe(
        map(([users]) => ({users})),
        tap(console.log)
      )
  }

}

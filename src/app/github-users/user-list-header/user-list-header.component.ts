import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs';
import { GithubService } from '../../services/github.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-user-list-header',
  standalone: true,
  imports: [ReactiveFormsModule, AsyncPipe],
  templateUrl: './user-list-header.component.html',
  styleUrl: './user-list-header.component.scss'
})
export class UserListHeaderComponent implements OnInit {
  maxSearchLength = 125;

  searchControl = new FormControl<string>("");

  totalResults$ = this.githubService.totalResults$;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        filter((searchString) => searchString !== null),
        map((searchString) => searchString?.trim()?.slice(0, this.maxSearchLength)),
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe((searchString) => {
        if (typeof searchString === 'string') {
          this.githubService.setSearchParameters({searchString, pageNumber: 1});
        }
      });
  }
}

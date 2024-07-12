import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs';
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
  searchControl = new FormControl<string>("");

  totalResults$ = this.githubService.totalResults$;

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        filter((searchString) => searchString !== null),
        debounceTime(300),
        distinctUntilChanged(),
      )
      .subscribe((searchString) => {
        if (typeof searchString === 'string') {
          this.githubService.setSearchString(searchString);
        }
      });
  }
}

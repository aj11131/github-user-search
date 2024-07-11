import { Component } from '@angular/core';
import { UserListComponent } from './user-list/user-list.component';
import { UserListHeaderComponent } from './user-list-header/user-list-header.component';

@Component({
  selector: 'app-github-users',
  standalone: true,
  imports: [UserListComponent, UserListHeaderComponent],
  templateUrl: './github-users.component.html',
  styleUrl: './github-users.component.scss'
})
export class GithubUsersComponent {

}

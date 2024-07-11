import { Component, Input } from '@angular/core';
import { GithubUser } from '../../types/github-user';

@Component({
  selector: 'app-user-row',
  standalone: true,
  imports: [],
  templateUrl: './user-row.component.html',
  styleUrl: './user-row.component.scss'
})
export class UserRowComponent {
  @Input() user!: GithubUser;
}

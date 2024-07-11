import { Component, Input } from '@angular/core';
import { GithubUser } from '../../types/github-user';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-user-row',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './user-row.component.html',
  styleUrl: './user-row.component.scss'
})
export class UserRowComponent {
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  @Input() user!: GithubUser;
}

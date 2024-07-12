import { Component, inject, Input, OnInit } from '@angular/core';
import { NgbActiveOffcanvas, NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { GithubService } from '../../services/github.service';
import { GithubUserDetails } from '../../types/github-user-details';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { faArrowUpRightFromSquare, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
	selector: 'app-user-info',
	standalone: true,
	templateUrl: './user-info.component.html',
  imports: [AsyncPipe, FontAwesomeModule],
	styles: `
		:host {
			height: 100%;
			display: flex;
			flex-direction: column;
		}
	`,
})
export class UserInfoComponent implements OnInit {
  faUsers = faUsers;
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;

  private githubService = inject(GithubService);

	activeOffcanvas = inject(NgbActiveOffcanvas);
  
  userName: string = '';

  user$!: Observable<GithubUserDetails>;

  ngOnInit(): void {
    this.user$ = this.githubService.selectedUser$;
    this.githubService.setSelectedUser(this.userName);
  }

}
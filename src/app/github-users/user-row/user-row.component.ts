import { Component, inject, Input } from '@angular/core';
import { GithubUser } from '../../types/github-user';
import { faArrowUpRightFromSquare, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { UserInfoComponent } from '../user-info/user-info.component';

@Component({
  selector: 'app-user-row',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './user-row.component.html',
  styleUrl: './user-row.component.scss'
})
export class UserRowComponent {
  private offcanvasService = inject(NgbOffcanvas);
  
  faArrowUpRightFromSquare = faArrowUpRightFromSquare;
  faInfoCircle = faInfoCircle

  @Input() user!: GithubUser;

  openUserInfo(userName: string) {
    const offcanvasRef = this.offcanvasService.open(UserInfoComponent, { position: 'end' });
    offcanvasRef.componentInstance.userName = userName;
  }
}

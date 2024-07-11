import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { By } from '@angular/platform-browser';
import { GithubService } from '../services/github.service';
import { Observable, of } from 'rxjs';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListComponent],
      providers: [
        {
          provide: GithubService,
          useValue: {
            getGithubUsers: () => of([])
          }
        }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('User should see list of github users if there are results.', () => {

    spyOn(TestBed.inject(GithubService), 'getGithubUsers').and.returnValue(of(
      [
        {
          login: "login",
          id: 1,
          node_id: "1",
          avatar_url: "avatar_url",
          gravatar_id: "gravatar_id",
          url: "url",
          html_url: "html_url",
          followers_url: "followers_url",
          following_url: "following_url",
          gists_url: "gists_url",
          starred_url: "starred_url",
          subscriptions_url: "subscriptions_url",
          organizations_url: "organizations_url",
          repos_url: "repos_url",
          events_url: "events_url",
          received_events_url: "received_events_url",
          type: "type",
          site_admin: false,
          score: 1
        }
      ]
    ));

    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('app-user-row'));
    expect(listItems.length).toBe(1);
  });

  it('User should see a message stating there are no results if there are no results.', () => {
    
    fixture.detectChanges();

    const noResults = fixture.debugElement.query(By.css('#test-no-results'));

    expect(noResults).toBeTruthy();

  });
});

import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'github-users', loadComponent: () => import('./github-users/github-users.component').then(m => m.GithubUsersComponent)},
    {path: '**', redirectTo: 'github-users'}
];

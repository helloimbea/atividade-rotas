import { Routes } from '@angular/router';
import { UsersList } from './pages/users-list/users-list';
import { UserDetail } from './pages/user-detail/user-detail';

export const routes: Routes = [
  {
    path: 'users',
    component: UsersList
  },
  {
    path: 'details',
    component: UserDetail
  },
  {
    path: 'details/:id',
    component: UserDetail
  },
 {
  path: '',
  redirectTo: '/users',
  pathMatch: 'full'
 }
];

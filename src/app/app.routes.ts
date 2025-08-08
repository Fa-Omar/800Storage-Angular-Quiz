import { Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list';
import { UserDetailComponent } from './components/user-detail/user-detail';

export const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: '**', redirectTo: '' }
];
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { UserService } from '../../services/user';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressBarModule
  ],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  currentPage = 1;
  totalPages = 1;
  loading = false;

  constructor(private userService: UserService, private router: Router, private searchService: SearchService) {}


  searchId: number | undefined;

  get filteredUsers(): User[] {
    if (!this.searchId) return this.users;
    return this.users.filter(u => u.id === this.searchId);
  }

  ngOnInit(): void {
    this.loadUsers();
    this.searchService.searchId$.subscribe(id => {
      this.searchId = id ?? undefined;
    });
  }

  loadUsers() {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  goToUser(user: User) {
    this.router.navigate(['/user', user.id]);
  }

  changePage(offset: number) {
    if (this.currentPage + offset >= 1 && this.currentPage + offset <= this.totalPages) {
      this.currentPage += offset;
      this.loadUsers();
    }
  }
}

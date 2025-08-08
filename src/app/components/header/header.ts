import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';
import { Component, Output, EventEmitter } from '@angular/core';
import { SearchService } from '../../services/search';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatLabel
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  searchId!: number;

  @Output() searchIdChange = new EventEmitter<number>();

  onSearchIdChange(): void {
    this.searchService.setSearchId(this.searchId); // ✅
  }

  constructor(private router: Router, private userService: UserService, private searchService: SearchService) {}

  onSearch(): void {
    if (!this.searchId) return;

    this.userService.getUserById(this.searchId).subscribe({
      next: () => this.router.navigate(['/user', this.searchId]),
      error: () => alert('User not found.')
    });
  }
}

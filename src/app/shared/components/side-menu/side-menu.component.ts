import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { User } from '../../interface/user';
import { UserService } from '../../services/userService/user.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { RouterLink, Router } from '@angular/router';


@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterLink],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  faAngleRight = faAngleRight;
  user: User | null = null;
  isLoading: boolean = true;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.user$.subscribe((user) => {
      this.user = user;
      this.isLoading = false;
    });

    if (!this.user) {
      this.userService.loadUserFromToken();
    }
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.userService.clearUser();
    this.router.navigate(['/login']);
  }
}
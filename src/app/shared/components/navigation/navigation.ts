import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, MatIconModule],
  template: `
    <nav class="bottom-navigation">
      <a 
        routerLink="/checkin" 
        routerLinkActive="active" 
        class="nav-item"
        [class.active]="isActive('/checkin')">
        <mat-icon>login</mat-icon>
        <span>Check In</span>
      </a>
      
      <a 
        routerLink="/checkout" 
        routerLinkActive="active" 
        class="nav-item"
        [class.active]="isActive('/checkout')">
        <mat-icon>logout</mat-icon>
        <span>Check Out</span>
      </a>
      
      <a 
        routerLink="/dashboard" 
        routerLinkActive="active" 
        class="nav-item"
        [class.active]="isActive('/dashboard')">
        <mat-icon>dashboard</mat-icon>
        <span>Dashboard</span>
      </a>
      
      <a 
        routerLink="/history" 
        routerLinkActive="active" 
        class="nav-item"
        [class.active]="isActive('/history')">
        <mat-icon>history</mat-icon>
        <span>History</span>
      </a>
      
      <a 
        routerLink="/profile" 
        routerLinkActive="active" 
        class="nav-item"
        [class.active]="isActive('/profile')">
        <mat-icon>person</mat-icon>
        <span>Profile</span>
      </a>
    </nav>
  `,
  styles: [`
    .bottom-navigation {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: white;
      border-top: 1px solid #e0e0e0;
      display: flex;
      justify-content: space-around;
      padding: 8px 0;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }

    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: #666;
      padding: 8px 12px;
      border-radius: 8px;
      transition: all 0.3s ease;
      min-width: 60px;
    }

    .nav-item:hover {
      background-color: #f5f5f5;
      color: #1976d2;
    }

    .nav-item.active {
      color: #1976d2;
      background-color: #e3f2fd;
    }

    .nav-item mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      margin-bottom: 4px;
    }

    .nav-item span {
      font-size: 12px;
      font-weight: 500;
      text-align: center;
    }

    @media (max-width: 480px) {
      .nav-item span {
        font-size: 10px;
      }
      
      .nav-item {
        padding: 6px 8px;
        min-width: 50px;
      }
    }
  `]
})
export class NavigationComponent {
  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}

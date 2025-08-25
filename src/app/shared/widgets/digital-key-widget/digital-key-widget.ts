import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-digital-key-widget',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="digital-key-card">
      <div class="card-content">
        <div class="card-info">
          <h3 class="card-title">{{ title }}</h3>
          <p class="card-description">{{ description }}</p>
          <button mat-stroked-button class="know-more-btn" (click)="onKnowMoreClick()">
            {{ buttonText }}
          </button>
        </div>
        <div class="card-icon">
          <div class="phone-icon">
            <mat-icon class="phone">smartphone</mat-icon>
            <mat-icon class="key">vpn_key</mat-icon>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .digital-key-card {
      background: white;
      margin: 0 16px 16px 16px;
      padding: 20px;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      border: 1px solid #e9ecef;
    }

    .card-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .card-info {
      flex: 1;
    }

    .card-title {
      font-size: 18px;
      font-weight: 600;
      color: #333;
      margin: 0 0 8px 0;
    }

    .card-description {
      font-size: 14px;
      color: #6c757d;
      margin: 0 0 16px 0;
      line-height: 1.4;
    }

    .know-more-btn {
      border-color: #1e3a8a !important;
      color: #1e3a8a !important;
      font-weight: 500;
      text-transform: none;
    }

    .card-icon {
      flex-shrink: 0;
    }

    .phone-icon {
      position: relative;
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .phone-icon .phone {
      font-size: 24px;
      width: 24px;
      height: 24px;
    }

    .phone-icon .key {
      position: absolute;
      bottom: -4px;
      right: -4px;
      font-size: 16px;
      width: 16px;
      height: 16px;
      background: #fbbf24;
      border-radius: 8px;
      padding: 2px;
      color: #1e3a8a;
    }

    @media (max-width: 480px) {
      .digital-key-card {
        margin: 0 12px 12px 12px;
        padding: 16px;
        border-radius: 12px;
      }
      
      .card-content {
        gap: 12px;
      }
      
      .phone-icon {
        width: 40px;
        height: 40px;
      }
      
      .phone-icon .phone {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }
    }
  `]
})
export class DigitalKeyWidget {
  @Input() title: string = 'Digital Key';
  @Input() description: string = 'Use your phone to unlock your room no lines, no hassle.';
  @Input() buttonText: string = 'Know More';
  @Output() knowMoreClick = new EventEmitter<void>();

  onKnowMoreClick(): void {
    this.knowMoreClick.emit();
  }
}

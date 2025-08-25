import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

export interface BookingDetails {
  bookingId: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  location?: string;
}

@Component({
  selector: 'app-booking-details-widget',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="booking-details-card">
      <div class="booking-id">{{ bookingDetails.bookingId }}</div>
      <h2 class="room-type">{{ bookingDetails.roomType }}</h2>
      <div class="booking-dates">
        <mat-icon class="calendar-icon">calendar_today</mat-icon>
        <span>{{ bookingDetails.checkInDate }} - {{ bookingDetails.checkOutDate }} ({{ bookingDetails.nights }} nights)</span>
      </div>
      <button mat-raised-button color="primary" class="checkin-btn" (click)="onCheckinClick()">
        {{ buttonText }}
      </button>
    </div>
  `,
  styles: [`
    .booking-details-card {
      background: white;
      margin: -20px 16px 16px 16px;
      padding: 20px;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      position: relative;
      z-index: 10;
    }

    .booking-id {
      font-size: 14px;
      color: #6c757d;
      font-weight: 500;
      margin-bottom: 8px;
    }

    .room-type {
      font-size: 24px;
      font-weight: 700;
      color: #333;
      margin: 0 0 12px 0;
      line-height: 1.2;
    }

    .booking-dates {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      color: #6c757d;
      font-size: 14px;
    }

    .calendar-icon {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #1e3a8a;
    }

    .checkin-btn {
      width: 100%;
      height: 48px;
      background: #1e3a8a !important;
      color: white !important;
      font-size: 16px;
      font-weight: 600;
      border-radius: 8px;
      text-transform: none;
      letter-spacing: 0.3px;
    }

    @media (max-width: 480px) {
      .booking-details-card {
        margin: -15px 12px 12px 12px;
        padding: 16px;
        border-radius: 12px;
      }
      
      .room-type {
        font-size: 20px;
      }
    }
  `]
})
export class BookingDetailsWidget {
  @Input() bookingDetails: BookingDetails = {
    bookingId: '#AC56897',
    roomType: 'Double Deluxe Room',
    checkInDate: 'Dec 24, 2025',
    checkOutDate: 'Dec 27, 2025',
    nights: 3
  };
  @Input() buttonText: string = 'Start Check-In';
  @Output() checkinClick = new EventEmitter<void>();

  onCheckinClick(): void {
    this.checkinClick.emit();
  }
}

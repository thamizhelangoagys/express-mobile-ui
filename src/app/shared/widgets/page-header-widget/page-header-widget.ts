import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { BookingDetailsModal, BookingDetails } from '../../components/modals/booking-details-modal/booking-details-modal';

@Component({
  selector: 'app-page-header-widget',
  standalone: true,
  imports: [CommonModule, MatIconModule, BookingDetailsModal],
  templateUrl: './page-header-widget.html',
  styleUrl: './page-header-widget.scss'
})
export class PageHeaderWidget {
  @Input() pageTitle: string = 'Check-in';
  @Input() roomType: string = 'Double Deluxe Room';
  @Input() showRoomInfo: boolean = true;
  @Input() showCloseButton: boolean = true;
  @Input() bookingDetails: BookingDetails = {
    bookingId: 'AC56897',
    roomType: 'Double Deluxe Room',
    checkInDate: 'Dec 24, 2024',
    checkOutDate: 'Dec 27, 2024',
    numberOfNights: 3,
    guestName: 'John Doe',
    totalAmount: 1440.00,
    status: 'Confirmed'
  };
  
  @Output() viewDetailsClicked = new EventEmitter<void>();

  showBookingDetailsModal = false;

  constructor(private router: Router) {}

  onCloseClick(): void {
    this.router.navigate(['/checkin']);
  }

  onViewDetailsClick(): void {
    this.showBookingDetailsModal = true;
    this.viewDetailsClicked.emit();
  }

  closeBookingDetailsModal(): void {
    this.showBookingDetailsModal = false;
  }
}

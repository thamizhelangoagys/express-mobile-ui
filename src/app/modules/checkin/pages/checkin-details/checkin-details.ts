import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RateBreakdownModal, RateBreakdown } from '../../../../shared/components/modals/rate-breakdown-modal/rate-breakdown-modal';
import { ConfirmDetailsModal, GuestDetails } from '../../../../shared/components/modals/confirm-details-modal/confirm-details-modal';
import { EditGuestModal, Guest } from '../../../../shared/components/modals/edit-guest-modal/edit-guest-modal';

export interface BookingDetails {
  confirmationNumber: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  nights: number;
  guests: number;
  tower: string;
  roomImage: string;
  authorizationAmount: number;
  cardEnding: string;
  cardType: string;
}

@Component({
  selector: 'app-checkin-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    RateBreakdownModal,
    ConfirmDetailsModal,
    EditGuestModal
  ],
  templateUrl: './checkin-details.html',
  styleUrl: './checkin-details.scss'
})
export class CheckinDetails implements OnInit {
  bookingDetails: BookingDetails = {
    confirmationNumber: 'AC56897',
    roomType: 'Double Deluxe Room',
    checkInDate: 'Dec 24',
    checkOutDate: 'Dec 27, 2025',
    nights: 3,
    guests: 3,
    tower: 'North tower',
    roomImage: 'assets/hotel-room.svg',
    authorizationAmount: 1400.00,
    cardEnding: '5037',
    cardType: 'amex'
  };

  guests: Guest[] = [
    {
      id: '1',
      name: 'Alex Jeremy',
      email: 'alex.jeremy@gmail.com',
      phone: '+1 (323) 223-2080',
      isPrimary: true,
      chargesAllowed: false
    },
    {
      id: '2',
      name: 'Sara Jeremy',
      isPrimary: false,
      chargesAllowed: true
    },
    {
      id: '3',
      name: 'Marcus Jeremy',
      isPrimary: false,
      chargesAllowed: true
    }
  ];

  // Modal states
  showRateBreakdownModal = false;
  showConfirmDetailsModal = false;
  showEditGuestModal = false;

  // Current guest being edited
  currentGuest: Guest | null = null;

  // Rate breakdown data
  rateBreakdown: RateBreakdown = {
    items: [
      { date: 'Dec 24, 2024', description: 'Dec 24, 2024', amount: 450.00 },
      { date: 'Dec 25, 2024', description: 'Dec 25, 2024', amount: 450.00 },
      { date: 'Dec 26, 2024', description: 'Dec 26, 2024', amount: 450.00 },
      { description: 'Incidentals', amount: 50.00 }
    ],
    subtotal: 1400.00,
    grandTotal: 1400.00
  };

  // Guest details for confirmation
  guestDetails: GuestDetails = {
    name: 'Alex Jeremy',
    email: 'alex.jeremy@gmail.com',
    mobile: '+1 (323) 223 - 2080',
    address: '2050 Marengo St, Los Angeles, CA 90033, United States'
  };

  // Comments section properties
  userComments: string = '';
  quickRequests: string[] = [
    'Late check-in',
    'Early check-in',
    'High floor room',
    'Quiet room',
    'Accessible room',
    'Extra towels',
    'Extra pillows',
    'Room service'
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Load booking details from route params or service
    this.loadBookingDetails();
  }

  private loadBookingDetails(): void {
    // In a real app, this would load from a service
    // For now, using the default data
  }

  getFormattedAmount(): string {
    return this.bookingDetails.authorizationAmount.toFixed(2);
  }

  goBack(): void {
    this.router.navigate(['/checkin']);
  }

  copyConfirmationNumber(): void {
    navigator.clipboard.writeText(this.bookingDetails.confirmationNumber);
    // Show success message
    console.log('Confirmation number copied to clipboard');
  }

  deleteGuest(guest: Guest): void {
    if (guest.isPrimary) {
      return; // Cannot delete primary guest
    }
    this.guests = this.guests.filter(g => g.id !== guest.id);
  }

  editGuest(guest: Guest): void {
    this.currentGuest = guest;
    this.showEditGuestModal = true;
  }

  closeEditGuestModal(): void {
    this.showEditGuestModal = false;
    this.currentGuest = null;
  }

  saveGuestChanges(updatedGuest: Guest): void {
    // Update the guest in the array
    const index = this.guests.findIndex(g => g.id === updatedGuest.id);
    if (index !== -1) {
      this.guests[index] = updatedGuest;
    }
    
    // Close modal
    this.closeEditGuestModal();
    
    console.log('Guest updated:', updatedGuest);
  }

  addSpecialRequest(): void {
    // Navigate to special requests page or open modal
    console.log('Add special request');
  }

  addQuickRequest(request: string): void {
    if (this.userComments) {
      this.userComments += ', ' + request;
    } else {
      this.userComments = request;
    }
  }

  viewAuthorizationDetails(): void {
    // Show rate breakdown modal
    this.showRateBreakdownModal = true;
  }

  closeRateBreakdownModal(): void {
    this.showRateBreakdownModal = false;
  }

  getCardLogo(cardType: string): string {
    switch (cardType.toLowerCase()) {
      case 'amex':
        return 'assets/amex-logo.svg';
      case 'visa':
        return 'assets/visa-logo.svg';
      case 'mastercard':
        return 'assets/mastercard-logo.svg';
      default:
        return 'assets/card-logo.svg';
    }
  }

  continueCheckin(): void {
    // Show confirm details modal
    this.showConfirmDetailsModal = true;
  }

  closeConfirmDetailsModal(): void {
    this.showConfirmDetailsModal = false;
  }

  confirmDetails(): void {
    // Close modal and navigate to arrival time selection
    this.showConfirmDetailsModal = false;
    this.router.navigate(['/checkin/arrival-time'], {
      state: {
        bookingDetails: this.bookingDetails,
        guests: this.guests,
        userComments: this.userComments
      }
    });
  }
}

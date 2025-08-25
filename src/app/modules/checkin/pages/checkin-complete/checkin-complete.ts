import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RateBreakdownModal, RateBreakdown } from '../../../../shared/components/modals/rate-breakdown-modal/rate-breakdown-modal';
import { ExpectationsWidget } from '../../../../shared/widgets/expectations-widget/expectations-widget';
import { WeatherWidget } from '../../../../shared/widgets/weather-widget/weather-widget';
import { PageHeaderWidget } from '../../../../shared/widgets/page-header-widget/page-header-widget';
import { BookingDetails } from '../../../../shared/components/modals/booking-details-modal/booking-details-modal';

export interface NextStep {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
  action?: string;
}

export interface AlternateOption {
  title: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-checkin-complete',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    RateBreakdownModal,
    ExpectationsWidget,
    WeatherWidget,
    PageHeaderWidget
  ],
  templateUrl: './checkin-complete.html',
  styleUrl: './checkin-complete.scss'
})
export class CheckinComplete implements OnInit {
  bookingDetails: BookingDetails = {
    bookingId: 'AC56897',
    roomType: 'Double Deluxe Room',
    checkInDate: 'Dec 24, 2024',
    checkOutDate: 'Dec 27, 2024',
    numberOfNights: 3,
    guestName: 'John Doe',
    totalAmount: 1440.00,
    status: 'Confirmed'
  };

  nextSteps: NextStep[] = [
    {
      id: 1,
      title: 'ID Verification Using Clear',
      description: 'Verify your ID with Clear and get your Digital Key to access your room.',
      isActive: true,
      isCompleted: false,
      action: 'Verify ID'
    },
    {
      id: 2,
      title: 'Room Selection',
      description: 'Select your preferred room from available options.',
      isActive: false,
      isCompleted: false
    },
    {
      id: 3,
      title: 'Digital Key or Print QR Code (Kiosk)',
      description: 'Receive your digital key or print QR code at the kiosk.',
      isActive: false,
      isCompleted: false
    }
  ];

  alternateOption: AlternateOption = {
    title: 'Front Desk',
    description: 'Once you receive your room ready notification, please proceed to the front desk with your photo ID to pick up your key.',
    icon: 'assets/front-desk-icon.svg'
  };

  showRateBreakdownModal = false;

  rateBreakdown: RateBreakdown = {
    items: [
      { date: 'Dec 24, 2024', description: 'Dec 24, 2024', amount: 450.00 },
      { date: 'Dec 25, 2024', description: 'Dec 25, 2024', amount: 450.00 },
      { date: 'Dec 26, 2024', description: 'Dec 26, 2024', amount: 450.00 },
      { description: 'Incidentals', amount: 50.00 },
      { description: 'Early Check-in Fee', amount: 40.00 }
    ],
    subtotal: 1400.00,
    grandTotal: 1440.00
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize component
  }

  showRateBreakdown(): void {
    this.showRateBreakdownModal = true;
  }

  closeRateBreakdownModal(): void {
    this.showRateBreakdownModal = false;
  }

  viewRoomDetails(): void {
    console.log('View room details');
  }

  performStepAction(step: NextStep): void {
    switch (step.id) {
      case 1:
        this.verifyID();
        break;
      case 2:
        this.selectRoom();
        break;
      case 3:
        this.getDigitalKey();
        break;
      default:
        console.log('Unknown step action');
    }
  }

  verifyID(): void {
    console.log('Opening ID verification with Clear...');
    // Simulate ID verification process
    setTimeout(() => {
      // Mark step 1 as completed and activate step 2
      this.nextSteps[0].isCompleted = true;
      this.nextSteps[0].isActive = false;
      this.nextSteps[1].isActive = true;
      this.nextSteps[1].action = 'Select Room';
    }, 2000);
  }

  selectRoom(): void {
    console.log('Opening room selection...');
    // Simulate room selection process
    setTimeout(() => {
      // Mark step 2 as completed and activate step 3
      this.nextSteps[1].isCompleted = true;
      this.nextSteps[1].isActive = false;
      this.nextSteps[2].isActive = true;
      this.nextSteps[2].action = 'Get Digital Key';
    }, 2000);
  }

  getDigitalKey(): void {
    console.log('Getting digital key...');
    // Simulate getting digital key
    setTimeout(() => {
      // Mark step 3 as completed
      this.nextSteps[2].isCompleted = true;
      this.nextSteps[2].isActive = false;
      console.log('Digital key received successfully!');
    }, 2000);
  }
}

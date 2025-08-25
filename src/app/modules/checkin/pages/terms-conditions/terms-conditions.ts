import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PageHeaderWidget } from '../../../../shared/widgets/page-header-widget/page-header-widget';

@Component({
  selector: 'app-terms-conditions',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    PageHeaderWidget
  ],
  templateUrl: './terms-conditions.html',
  styleUrl: './terms-conditions.scss'
})
export class TermsConditions implements OnInit {
  @ViewChild('termsScroll', { static: false }) termsScroll!: ElementRef;
  
  hasScrolledToBottom = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Initialize component
  }

  onScroll(event: any): void {
    const element = event.target;
    const scrollTop = element.scrollTop;
    const scrollHeight = element.scrollHeight;
    const clientHeight = element.clientHeight;
    
    // Check if user has scrolled to the bottom (with a small tolerance)
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;
    this.hasScrolledToBottom = isAtBottom;
  }

  viewRoomDetails(): void {
    console.log('View room details');
  }

  agreeAndProceed(): void {
    if (this.hasScrolledToBottom) {
      this.router.navigate(['/checkin/signature'], {
        state: {
          termsAccepted: true
        }
      });
    }
  }
}

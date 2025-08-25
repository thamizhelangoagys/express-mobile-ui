import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

// Import all widgets
import { RoomImageWidget } from '../../widgets/room-image-widget/room-image-widget';
import { BookingDetailsWidget } from '../../widgets/booking-details-widget/booking-details-widget';
import { DigitalKeyWidget } from '../../widgets/digital-key-widget/digital-key-widget';
import { WeatherWidget } from '../../widgets/weather-widget/weather-widget';
import { ExpectationsWidget } from '../../widgets/expectations-widget/expectations-widget';

import { PageConfig, PageWidget } from '../../services/page-builder.service';

@Component({
  selector: 'app-dynamic-page',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    RoomImageWidget,
    BookingDetailsWidget,
    DigitalKeyWidget,
    WeatherWidget,
    ExpectationsWidget
  ],
  template: `
    <div class="dynamic-page">
      <!-- Loading State -->
      <div *ngIf="isLoading" class="loading-container">
        <mat-spinner diameter="40"></mat-spinner>
        <p class="loading-text">Loading page...</p>
      </div>

      <!-- Page Content -->
      <div *ngIf="!isLoading && pageConfig" class="page-content">
        <!-- Page Title -->
        <div *ngIf="showTitle" class="page-title">
          <h1>{{ pageConfig.title }}</h1>
        </div>

        <!-- Dynamic Widgets -->
        <ng-container *ngFor="let widget of sortedWidgets">
          <!-- Room Image Widget -->
          <app-room-image-widget
            *ngIf="widget.type === 'room-image'"
            [imageSrc]="widget.config?.imageSrc"
            [altText]="widget.config?.altText">
          </app-room-image-widget>

          <!-- Booking Details Widget -->
          <app-booking-details-widget
            *ngIf="widget.type === 'booking-details'"
            [bookingDetails]="widget.config?.bookingDetails"
            [buttonText]="widget.config?.buttonText"
            (checkinClick)="onWidgetEvent('booking-details', 'checkinClick', $event)">
          </app-booking-details-widget>

          <!-- Digital Key Widget -->
          <app-digital-key-widget
            *ngIf="widget.type === 'digital-key'"
            [title]="widget.config?.title"
            [description]="widget.config?.description"
            [buttonText]="widget.config?.buttonText"
            (knowMoreClick)="onWidgetEvent('digital-key', 'knowMoreClick', $event)">
          </app-digital-key-widget>

          <!-- Weather Widget -->
          <app-weather-widget
            *ngIf="widget.type === 'weather'"
            [title]="widget.config?.title"
            [weatherData]="widget.config?.weatherData">
          </app-weather-widget>

          <!-- Expectations Widget -->
          <app-expectations-widget
            *ngIf="widget.type === 'expectations'"
            [sectionTitle]="widget.config?.sectionTitle"
            [expectationCards]="widget.config?.expectationCards">
          </app-expectations-widget>
        </ng-container>
      </div>

      <!-- Error State -->
      <div *ngIf="!isLoading && !pageConfig" class="error-container">
        <mat-icon class="error-icon">error</mat-icon>
        <h3>Page Not Found</h3>
        <p>The requested page could not be loaded.</p>
        <button mat-raised-button color="primary" (click)="retry.emit()">
          Try Again
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dynamic-page {
      min-height: 100vh;
      background: #f8f9fa;
      padding-bottom: 20px;
    }

    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
    }

    .loading-text {
      color: #6c757d;
      font-size: 16px;
      margin-top: 16px;
    }

    .page-content {
      display: flex;
      flex-direction: column;
    }

    .page-title {
      background: white;
      padding: 20px 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .page-title h1 {
      font-size: 24px;
      font-weight: 600;
      color: #333;
      margin: 0;
      text-align: center;
    }

    .error-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 60px 20px;
      text-align: center;
    }

    .error-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      color: #dc3545;
      margin-bottom: 16px;
    }

    .error-container h3 {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin: 0 0 8px 0;
    }

    .error-container p {
      color: #6c757d;
      margin: 0 0 24px 0;
    }

    @media (max-width: 480px) {
      .page-title {
        padding: 16px 12px;
      }

      .page-title h1 {
        font-size: 20px;
      }
    }
  `]
})
export class DynamicPage implements OnInit {
  @Input() pageConfig: PageConfig | null = null;
  @Input() isLoading: boolean = false;
  @Input() showTitle: boolean = true;
  
  @Output() widgetEvent = new EventEmitter<{widgetType: string, eventType: string, data: any}>();
  @Output() retry = new EventEmitter<void>();

  sortedWidgets: PageWidget[] = [];

  ngOnInit(): void {
    this.updateSortedWidgets();
  }

  ngOnChanges(): void {
    this.updateSortedWidgets();
  }

  private updateSortedWidgets(): void {
    if (this.pageConfig?.widgets) {
      this.sortedWidgets = [...this.pageConfig.widgets].sort((a, b) => a.order - b.order);
    } else {
      this.sortedWidgets = [];
    }
  }

  onWidgetEvent(widgetType: string, eventType: string, data: any): void {
    this.widgetEvent.emit({ widgetType, eventType, data });
  }
}

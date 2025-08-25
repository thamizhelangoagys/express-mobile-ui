import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';

// Import the dynamic page component
import { DynamicPage } from '../../../../shared/components/dynamic-page/dynamic-page';
import { PageBuilderService, PageConfig } from '../../../../shared/services/page-builder.service';

@Component({
  selector: 'app-checkin-main',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    DynamicPage
  ],
  template: `
    <app-dynamic-page
      [pageConfig]="pageConfig"
      [isLoading]="isLoading"
      [showTitle]="false"
      (widgetEvent)="onWidgetEvent($event)"
      (retry)="loadPage()">
    </app-dynamic-page>
  `,
  styleUrl: './checkin-main.scss'
})
export class CheckinMain implements OnInit {
  pageConfig: PageConfig | null = null;
  isLoading = true;

  constructor(
    private pageBuilderService: PageBuilderService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(): void {
    this.isLoading = true;
    this.pageBuilderService.getPageConfig('checkin').subscribe({
      next: (config) => {
        this.pageConfig = config;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading page config:', error);
        this.isLoading = false;
      }
    });
  }

  onWidgetEvent(event: {widgetType: string, eventType: string, data: any}): void {
    switch (event.widgetType) {
      case 'booking-details':
        if (event.eventType === 'checkinClick') {
          this.startCheckin();
        }
        break;
      case 'digital-key':
        if (event.eventType === 'knowMoreClick') {
          this.showDigitalKeyInfo();
        }
        break;
      default:
        console.log('Widget event:', event);
    }
  }

  startCheckin(): void {
    // Navigate to the check-in details page instead of showing modal
    this.router.navigate(['/checkin/details']);
  }

  showDigitalKeyInfo(): void {
    this.snackBar.open('Digital key feature coming soon!', 'Close', {
      duration: 3000,
      panelClass: ['info-snackbar']
    });
  }
}

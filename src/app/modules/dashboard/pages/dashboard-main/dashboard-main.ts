import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

// Import the dynamic page component
import { DynamicPage } from '../../../../shared/components/dynamic-page/dynamic-page';
import { PageBuilderService, PageConfig } from '../../../../shared/services/page-builder.service';

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    DynamicPage
  ],
  template: `
    <app-dynamic-page
      [pageConfig]="pageConfig"
      [isLoading]="isLoading"
      [showTitle]="true"
      (widgetEvent)="onWidgetEvent($event)"
      (retry)="loadPage()">
    </app-dynamic-page>
  `,
  styleUrl: './dashboard-main.scss'
})
export class DashboardMain implements OnInit {
  pageConfig: PageConfig | null = null;
  isLoading = true;

  constructor(
    private pageBuilderService: PageBuilderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPage();
  }

  loadPage(): void {
    this.isLoading = true;
    this.pageBuilderService.getPageConfig('dashboard').subscribe({
      next: (config) => {
        this.pageConfig = config;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading dashboard config:', error);
        this.isLoading = false;
      }
    });
  }

  onWidgetEvent(event: {widgetType: string, eventType: string, data: any}): void {
    switch (event.widgetType) {
      case 'digital-key':
        if (event.eventType === 'knowMoreClick') {
          this.router.navigate(['/checkin']);
        }
        break;
      default:
        console.log('Dashboard widget event:', event);
    }
  }
}

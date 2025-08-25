import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ApiService, ApiResponse } from './api.service';

export interface Location {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  type: 'office' | 'warehouse' | 'retail' | 'other';
  isActive: boolean;
}

export interface CheckinRequest {
  locationId: string;
  userId: string;
  checkinTime: string;
  notes?: string;
}

export interface CheckinResponse {
  id: string;
  locationId: string;
  userId: string;
  checkinTime: string;
  checkoutTime?: string;
  status: 'checked-in' | 'checked-out';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  employeeId: string;
  department: string;
  position: string;
  avatar?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CheckinService {
  // Dummy data for demonstration
  private dummyLocations: Location[] = [
    {
      id: '1',
      name: 'Main Office - Downtown',
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      type: 'office',
      isActive: true
    },
    {
      id: '2',
      name: 'Warehouse - Brooklyn',
      address: '456 Industrial Ave',
      city: 'Brooklyn',
      state: 'NY',
      zipCode: '11201',
      type: 'warehouse',
      isActive: true
    },
    {
      id: '3',
      name: 'Retail Store - Manhattan',
      address: '789 Broadway',
      city: 'Manhattan',
      state: 'NY',
      zipCode: '10003',
      type: 'retail',
      isActive: true
    },
    {
      id: '4',
      name: 'Branch Office - Queens',
      address: '321 Queens Blvd',
      city: 'Queens',
      state: 'NY',
      zipCode: '11101',
      type: 'office',
      isActive: true
    }
  ];

  private dummyUsers: User[] = [
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@express.com',
      employeeId: 'EMP001',
      department: 'Operations',
      position: 'Manager'
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@express.com',
      employeeId: 'EMP002',
      department: 'Sales',
      position: 'Representative'
    },
    {
      id: '3',
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike.johnson@express.com',
      employeeId: 'EMP003',
      department: 'IT',
      position: 'Developer'
    }
  ];

  private checkinHistory: CheckinResponse[] = [];

  constructor(private apiService: ApiService) {}

  getLocations(): Observable<ApiResponse<Location[]>> {
    // Simulate API call with delay
    return of({
      success: true,
      data: this.dummyLocations,
      message: 'Locations retrieved successfully'
    }).pipe(delay(500));
  }

  getUsers(): Observable<ApiResponse<User[]>> {
    // Simulate API call with delay
    return of({
      success: true,
      data: this.dummyUsers,
      message: 'Users retrieved successfully'
    }).pipe(delay(300));
  }

  performCheckin(checkinRequest: CheckinRequest): Observable<ApiResponse<CheckinResponse>> {
    const checkin: CheckinResponse = {
      id: `checkin_${Date.now()}`,
      locationId: checkinRequest.locationId,
      userId: checkinRequest.userId,
      checkinTime: checkinRequest.checkinTime,
      status: 'checked-in',
      notes: checkinRequest.notes,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.checkinHistory.push(checkin);

    return of({
      success: true,
      data: checkin,
      message: 'Check-in completed successfully'
    }).pipe(delay(800));
  }

  getCheckinHistory(userId?: string): Observable<ApiResponse<CheckinResponse[]>> {
    let filteredHistory = this.checkinHistory;
    
    if (userId) {
      filteredHistory = this.checkinHistory.filter(checkin => checkin.userId === userId);
    }

    return of({
      success: true,
      data: filteredHistory,
      message: 'Check-in history retrieved successfully'
    }).pipe(delay(400));
  }

  performCheckout(checkinId: string): Observable<ApiResponse<CheckinResponse>> {
    const checkin = this.checkinHistory.find(c => c.id === checkinId);
    
    if (!checkin) {
      return of({
        success: false,
        data: {} as CheckinResponse,
        error: 'Check-in record not found'
      }).pipe(delay(300));
    }

    checkin.status = 'checked-out';
    checkin.checkoutTime = new Date().toISOString();
    checkin.updatedAt = new Date().toISOString();

    return of({
      success: true,
      data: checkin,
      message: 'Check-out completed successfully'
    }).pipe(delay(600));
  }

  getCurrentUser(): Observable<ApiResponse<User>> {
    // Simulate getting current user from session
    const currentUser = this.dummyUsers[0]; // Default to first user for demo
    
    return of({
      success: true,
      data: currentUser,
      message: 'Current user retrieved successfully'
    }).pipe(delay(200));
  }
}

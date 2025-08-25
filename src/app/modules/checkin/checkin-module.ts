import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CheckinMain } from './pages/checkin-main/checkin-main';

const routes: Routes = [
  {
    path: '',
    component: CheckinMain
  },
  {
    path: 'details',
    loadComponent: () => import('./pages/checkin-details/checkin-details').then(m => m.CheckinDetails)
  },
  {
    path: 'arrival-time',
    loadComponent: () => import('./pages/arrival-time/arrival-time').then(m => m.ArrivalTime)
  },
  {
    path: 'terms',
    loadComponent: () => import('./pages/terms-conditions/terms-conditions').then(m => m.TermsConditions)
  },
  {
    path: 'signature',
    loadComponent: () => import('./pages/signature/signature').then(m => m.Signature)
  },
  {
    path: 'card-details',
    loadComponent: () => import('./pages/card-details/card-details').then(m => m.CardDetails)
  },
  {
    path: 'complete',
    loadComponent: () => import('./pages/checkin-complete/checkin-complete').then(m => m.CheckinComplete)
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CheckinMain
  ]
})
export class CheckinModule { }

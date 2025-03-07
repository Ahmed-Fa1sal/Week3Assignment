import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'upload', component: DocumentUploadComponent }
];

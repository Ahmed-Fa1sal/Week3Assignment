import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DocumentUploadComponent } from './document-upload/document-upload.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // FormsModule added for template-driven forms
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { documentReducer } from './store/reducer'; // Import your NgRx reducer

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DocumentUploadComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, 
    FormsModule, // Useful if needed
    HttpClientModule,
    StoreModule.forRoot({ document: documentReducer }) // Register NgRx reducer
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

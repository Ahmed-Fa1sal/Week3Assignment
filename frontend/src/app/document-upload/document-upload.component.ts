import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { uploadDocument, uploadDocumentSuccess, uploadDocumentFailure } from '../store/actions';  // Import actions
import { Observable } from 'rxjs';

@Component({
  selector: 'app-document-upload',
  templateUrl: './document-upload.component.html',
  styleUrls: ['./document-upload.component.css']
})
export class DocumentUploadComponent {
  uploadForm: FormGroup;
  documentState$: Observable<any>;

  constructor(private http: HttpClient, private fb: FormBuilder, private store: Store) {
    this.uploadForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(200)]],
      filePath: ['', [Validators.required]],
      status: ['', [Validators.required]],
    });

    this.documentState$ = this.store.select((state) => state);


  }

  // Submit form data to the backend API
  onSubmit(): void {
    if (this.uploadForm.valid) {
      const formData = this.uploadForm.value;
      this.store.dispatch(uploadDocument({ document: formData }));  // Dispatch the upload action

      this.http.post('http://localhost:5292/api/documents', formData)
        .subscribe(
          response => {
            this.store.dispatch(uploadDocumentSuccess({ response }));  // Dispatch success action
          },
          error => {
            this.store.dispatch(uploadDocumentFailure({ error }));  // Dispatch failure action
          }
        );
    } else {
      alert('Please fill out the form correctly');
    }
  }

  // Getter for form controls
  get title() { return this.uploadForm.get('title'); }
  get filePath() { return this.uploadForm.get('filePath'); }
  get status() { return this.uploadForm.get('status'); }
}

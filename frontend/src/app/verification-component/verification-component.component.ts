import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {
  verificationForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.verificationForm = this.fb.group({
      verificationCode: ['', [Validators.required, Validators.maxLength(6)]]
    });
  }

  // Submit verification code to backend API
  onSubmit(): void {
    if (this.verificationForm.valid) {
      const { verificationCode } = this.verificationForm.value;
      this.http.post(`http://localhost:5292/api/documents/verify`, { verificationCode })
        .subscribe(response => {
          console.log('Document verified successfully', response);
        }, error => {
          console.error('Error verifying document', error);
        });
    } else {
      alert('Please enter a valid verification code');
    }
  }

  // Getter for form controls
  get verificationCode() { return this.verificationForm.get('verificationCode'); }
}

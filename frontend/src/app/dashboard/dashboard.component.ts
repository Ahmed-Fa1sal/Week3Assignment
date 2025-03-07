import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  documents: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getDocuments();
  }

  // Fetch documents from the backend API
  getDocuments(): void {
    this.http.get<any[]>('http://localhost:5292/api/documents')
      .subscribe(
        (data) => {
          this.documents = data;
        },
        (error) => {
          console.error('Error fetching documents', error);
        }
      );
  }
}

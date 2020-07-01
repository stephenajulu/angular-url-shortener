import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  uri = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  postDocument(document: any) {
    return this.http.post(this.uri, document);
  }

  getDocument(shortId: string) {
    return this.http.get(this.uri + shortId);
  }
}

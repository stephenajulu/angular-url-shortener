import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MongoDocument } from '../models/mongo-document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  rootUri = 'https://shortened.daedal.pro/documents/';

  constructor(private http: HttpClient) {}

  createGenericDocument(document: MongoDocument) {
    return this.http.post(this.rootUri, document);
  }

  createCustomDocument(document: MongoDocument, shortId: string) {
    return this.http.post(this.rootUri + 'customId/' + shortId, document);
  }

  getDocumentByShortId(shortId: string) {
    return this.http.get(this.rootUri + shortId);
  }

  updateDocumentById(document: MongoDocument, id: string) {
    return this.http.put(this.rootUri + id, document);
  }

  deleteDocumentById(id: string) {
    return this.http.delete(this.rootUri + id);
  }

  verifyIfIdIsAvailable(shortId: string) {
    return this.http.get(this.rootUri + 'checkId/' + shortId);
  }
}

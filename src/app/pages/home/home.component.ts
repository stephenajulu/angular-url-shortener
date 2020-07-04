import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MongoDocument } from '../../models/mongo-document.model';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent {
  mongoDocument = new MongoDocument();
  created = false;

  constructor(private documentService: DocumentService, private snackBar: MatSnackBar) {}

  createGenericDocument() {
    this.documentService
      .createGenericDocument(this.mongoDocument.url)
      .then((response: any) => {
        this.mongoDocument = response.mongoDocument;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  copyLink() {
    this.snackBar.open('Lien copié', '', { duration: 2000, horizontalPosition: 'start' });
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `https://shortened.daedal.pro/${this.mongoDocument.shortId}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  copyQrCode() {
    this.snackBar.open('QRCode copié', '', { duration: 2000, horizontalPosition: 'start' });
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.mongoDocument.qrCode;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  reset() {
    this.mongoDocument = new MongoDocument();
  }
}

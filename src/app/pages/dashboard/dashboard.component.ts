import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MONGOUSER } from 'src/app/mocks/mongo-user.mock';
import { MongoDocument } from 'src/app/models/mongo-document.model';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  mongoDocuments: Array<MongoDocument> = [];
  loaded = false;

  constructor(private documentService: DocumentService, private snackBar: MatSnackBar, public dialog: MatDialog) {}

  ngOnInit() {
    this.documentService
      .getDocumentsByUserId(MONGOUSER.id)
      .then((response: any) => {
        this.mongoDocuments = response;
        this.loaded = true;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  copyLink(mongoDocument: MongoDocument) {
    this.snackBar.open('Lien copié', '', { duration: 2000, horizontalPosition: 'start' });
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = `https://shortened.daedal.pro/${mongoDocument.shortId}`;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  showQrCode(mongoDocument: MongoDocument) {
    this.dialog.open(QrCodeComponent, {
      data: {
        qrCode: mongoDocument.qrCode
      }
    });
  }

  deleteDocument(mongoDocument: MongoDocument) {
    console.log(mongoDocument);
    this.documentService
      .deleteDocumentById(mongoDocument._id)
      .then(() => {
        this.snackBar.open('Document effacé', '', { duration: 2000, horizontalPosition: 'start' });
        this.ngOnInit();
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

@Component({
  selector: 'app-qrcode',
  templateUrl: 'qrcode.component.html'
})
export class QrCodeComponent {
  qrCode: string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.qrCode = data.qrCode;
  }
}

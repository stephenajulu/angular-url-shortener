import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LAYOUT } from 'src/app/mocks/layout.mock';
import { MONGOUSER } from 'src/app/mocks/mongo-user.mock';
import { MongoDocument } from '../../models/mongo-document.model';
import { DocumentService } from '../../services/document.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
  mongoDocument = new MongoDocument();
  layout = LAYOUT;
  slugForm: FormGroup;
  customSlug = false;

  constructor(private documentService: DocumentService, private snackBar: MatSnackBar, private fb: FormBuilder) {}

  ngOnInit() {
    if (this.layout.userConnected) {
      this.slugForm = this.fb.group({
        slug: [ { value: '', disabled: true }, Validators.pattern, this.slugVerificator() ]
      });
    }
  }

  slugVerificator(): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      const response = await this.documentService.verifyIfshortIdIsAvailable(control.value);
      return !response ? { unavailable: true } : null;
    };
  }

  enableCustomization() {
    if (this.customSlug) {
      this.slugForm.get('slug').enable();
    } else {
      this.slugForm.get('slug').reset();
      this.slugForm.get('slug').disable();
    }
  }

  createDocument() {
    if (this.customSlug) {
      this.createCustomDocument();
    } else {
      this.createGenericDocument();
    }
  }

  createGenericDocument() {
    if (this.mongoDocument.url !== '' && this.mongoDocument.url !== undefined) {
      this.documentService
        .createGenericDocument(this.mongoDocument.url, this.layout.userConnected ? MONGOUSER.id : '')
        .then((response: any) => {
          this.mongoDocument = response;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.snackBar.open('Merci de renseigner tous les champs', '', { duration: 2000, horizontalPosition: 'start' });
    }
  }

  createCustomDocument() {
    if (this.slugForm.status === 'VALID') {
      if (this.mongoDocument.url !== '' && this.mongoDocument.url !== undefined) {
        this.documentService
          .createCustomDocument(this.mongoDocument.url, this.slugForm.value.slug, MONGOUSER.id)
          .then((response: any) => {
            this.mongoDocument = response;
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.snackBar.open('Merci de renseigner tous les champs', '', { duration: 2000, horizontalPosition: 'start' });
      }
    } else {
      this.snackBar.open('Demande invalide', '', { duration: 2000, horizontalPosition: 'start' });
    }
  }

  submitUrl(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.createDocument();
    }
  }

  submitSlug(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.createDocument();
    }
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

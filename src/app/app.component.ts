import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  title = 'angular-url-shortener';
  input: string;
  document: any;
  response = false;
  loading = false;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {
    const shortId = window.location.href.replace('http://localhost:4200/', '');
    if (shortId !== '') {
      this.getUrl(shortId);
    } else {
      this.loading = true;
    }
  }

  postUrl() {
    if (this.input !== '') {
      this.api
        .postDocument({ url: this.input })
        .toPromise()
        .then((mongoDocument: any) => {
          this.document = mongoDocument.mongoDocument;
          this.response = true;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  getUrl(shortId: string) {
    this.api
      .getDocument(shortId)
      .toPromise()
      .then((response: any) => {
        console.log(response);
        location.replace(response.url);
      })
      .catch();
  }
}

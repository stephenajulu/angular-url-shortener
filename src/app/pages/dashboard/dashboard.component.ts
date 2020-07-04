import { Component, OnInit, ɵConsole } from '@angular/core';
import { DocumentService } from 'src/app/services/document.service';
import { MONGOUSER } from 'src/app/mocks/mongo-user.mock';
import { MongoDocument } from 'src/app/models/mongo-document.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  mongoDocuments: Array<MongoDocument>;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documentService
      .getDocumentsByUserId(MONGOUSER.id)
      .then((response: any) => {
        this.mongoDocuments = response;
        console.log(this.mongoDocuments);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

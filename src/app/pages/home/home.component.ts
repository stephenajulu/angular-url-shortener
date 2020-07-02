import { Component, OnInit } from '@angular/core';
import { MONGOUSER } from 'src/app/mocks/mongo-user.mock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
  connected = false;

  constructor() {}

  ngOnInit() {
    if (Object.keys(MONGOUSER).length === 0) {
      this.connected = true;
    }
  }
}

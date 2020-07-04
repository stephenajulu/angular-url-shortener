import { Component, OnInit } from '@angular/core';
import { LAYOUT } from './mocks/layout.mock';
import { MONGOUSER } from './mocks/mongo-user.mock';
import { CookiesService } from './services/cookies.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  loaded = false;

  constructor(private cookiesService: CookiesService, private userService: UserService) {}

  ngOnInit() {
    if (this.cookiesService.checkCookie('login')) {
      const credentials = JSON.parse(atob(this.cookiesService.getCookie('login')));
      this.userService
        .getUserbyUsername(credentials.username, credentials.password)
        .then((response: any) => {
          MONGOUSER.username = response.username;
          MONGOUSER.email = response.email;
          MONGOUSER.password = response.password;
          MONGOUSER.id = response._id;
          LAYOUT.userConnected = true;
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loaded = true;
        });
    } else {
      this.loaded = true;
    }
  }
}

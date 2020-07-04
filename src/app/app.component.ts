import { Component, OnInit } from '@angular/core';
import { CookiesService } from './services/cookies.service';
import { UserService } from './services/user.service';
import { MONGOUSER } from './mocks/mongo-user.mock';
import { LAYOUT } from './mocks/layout.mock';

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

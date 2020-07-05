import { Component } from '@angular/core';
import { LAYOUT } from 'src/app/mocks/layout.mock';
import { CookiesService } from 'src/app/services/cookies.service';
import { MONGOUSER } from 'src/app/mocks/mongo-user.mock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [ './navigation.component.scss' ]
})
export class NavigationComponent {
  layout = LAYOUT;

  constructor(private cookiesService: CookiesService, private router: Router) {}

  disconnect() {
    this.cookiesService.deleteCookie('login');
    this.layout.userConnected = false;
    this.router.navigate([ 'home' ]);
  }
}

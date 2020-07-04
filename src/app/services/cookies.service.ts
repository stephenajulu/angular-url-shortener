import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookiesService {
  constructor(private cookieService: CookieService) {}

  checkCookie(name: string) {
    return this.cookieService.check(name);
  }

  getCookie(name: string) {
    return this.cookieService.get(name);
  }

  getAllCookies() {
    return this.cookieService.getAll();
  }

  setCookie(name: string, value: string) {
    this.cookieService.set(
      name,
      value,
      365,
      '/'
      // '.daedal.pro', true, 'Strict'
    );
  }

  deleteCookie(name: string) {
    this.cookieService.delete(
      name
      // , '/', '.daedal.pro'
    );
  }

  deleteAllCookies() {
    this.cookieService.deleteAll('/', '.daedal.pro');
  }
}

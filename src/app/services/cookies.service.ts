import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment';

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
    this.cookieService.set(name, value, 1, '/', environment.cookieDomain, environment.cookieSecure, environment.cookieSameSite);
  }

  deleteCookie(name: string) {
    this.cookieService.delete(name, '/', environment.cookieDomain);
  }

  deleteAllCookies() {
    this.cookieService.deleteAll('/', environment.cookieDomain);
  }
}

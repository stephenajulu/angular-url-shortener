import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MONGOUSER } from 'src/app/mocks/mongo-user.mock';
import { CookiesService } from 'src/app/services/cookies.service';
import { LAYOUT } from '../../mocks/layout.mock';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.scss' ]
})
export class LoginComponent implements OnInit {
  cookie = false;
  layout = LAYOUT;
  loginForm: FormGroup;
  error = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private cookiesService: CookiesService) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: [ '', Validators.required ],
      password: [ '', Validators.required ]
    });
  }

  connectUser() {
    this.userService
      .getUserbyUsername(this.loginForm.value.username, this.loginForm.value.password)
      .then((response: any) => {
        MONGOUSER.username = response.username;
        MONGOUSER.email = response.email;
        MONGOUSER.password = this.loginForm.value.password;
        this.layout.userConnected = true;
        if (this.cookie) {
          this.cookiesService.setCookie('login', btoa(JSON.stringify({ username: MONGOUSER.username, password: MONGOUSER.password })));
        }
        this.router.navigate([ 'home' ]);
      })
      .catch(() => {
        this.error = true;
      });
  }

  resetPasswordErrorMessage() {
    this.error = false;
  }
}

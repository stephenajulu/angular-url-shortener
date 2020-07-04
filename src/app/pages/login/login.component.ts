import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MONGOUSER } from 'src/app/mocks/mongo-user.mock';
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

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private snackBar: MatSnackBar) {}

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
        this.layout.userConnected = true;
        this.router.navigate([ 'home' ]);
      })
      .catch((err) => {
        this.error = true;
      });
  }

  resetError() {
    this.error = false;
  }
}

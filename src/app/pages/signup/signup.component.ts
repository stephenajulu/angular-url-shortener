import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookiesService } from 'src/app/services/cookies.service';
import { LAYOUT } from '../../mocks/layout.mock';
import { MONGOUSER } from '../../mocks/mongo-user.mock';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.scss' ]
})
export class SignupComponent implements OnInit {
  validation = false;
  layout = LAYOUT;
  signupForm: FormGroup;
  cookie = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private cookiesService: CookiesService) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: [ '', Validators.required, this.userVerificator() ],
      email: [ '', Validators.compose([ Validators.email, Validators.required ]) ],
      password: [ '', Validators.required ],
      confirmPassword: [ '', Validators.compose([ Validators.required, this.passwordMatcher() ]) ]
    });
  }

  userVerificator(): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      const response = await this.userService.verifyIfUsernameIsAvailable(control.value);
      return !response ? { unavailable: true } : null;
    };
  }

  passwordMatcher(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value) {
        return control.value !== control.root.get('password').value ? { unmatch: true } : null;
      }
      return null;
    };
  }

  submitUser() {
    MONGOUSER.email = this.signupForm.value.email;
    MONGOUSER.password = this.signupForm.value.password;
    MONGOUSER.username = this.signupForm.value.username;
    this.userService
      .createUser(MONGOUSER)
      .then((response: any) => {
        MONGOUSER.id = response.mongoUser._id;
        this.layout.userConnected = true;
        if (this.cookie) {
          this.cookiesService.setCookie('login', btoa(JSON.stringify({ username: MONGOUSER.username, password: MONGOUSER.password })));
        }
        this.router.navigate([ 'home' ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

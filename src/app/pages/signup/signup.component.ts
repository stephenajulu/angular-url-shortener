import { Component } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LAYOUT } from '../../mocks/layout.mock';
import { MONGOUSER } from '../../mocks/mongo-user.mock';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.scss' ]
})
export class SignupComponent {
  passwordVisibility = true;
  validation = false;
  validating = false;
  unavailable = true;
  mongoUser = MONGOUSER;
  layout = LAYOUT;

  signupForm = this.fb.group({
    firstName: [ '', Validators.required ],
    lastName: [ '', Validators.required ],
    email: [ '', Validators.compose([ Validators.email, Validators.required ]), this.emailVerificator() ],
    password: [ '', Validators.required ],
    confirmPassword: [ '', Validators.compose([ this.passwordMatcher, Validators.required ]) ]
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  emailVerificator(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
      return this.userService.verifyIfEmailIsAvailable(control.value).then((response) => {
        return !response ? { unavailable: true } : null;
      });
    };
  }

  passwordMatcher(input: FormControl) {
    return MONGOUSER.password !== input.value ? { unmatch: true } : null;
  }

  submitUser() {
    this.userService
      .createUser(MONGOUSER)
      .then(() => {
        this.layout.userConnected = true;
        this.router.navigate([ 'home' ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

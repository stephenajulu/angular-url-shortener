import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LAYOUT } from '../../mocks/layout.mock';
import { MONGOUSER } from '../../mocks/mongo-user.mock';
import { UserService } from '../../services/user.service';

const passwordMatcher = (input: FormControl) => {
  return MONGOUSER.password === input.value ? null : { match: true };
};

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.scss' ]
})
export class SignupComponent {
  passwordVisibility = true;
  validation = false;
  unavailable = true;
  mongoUser = MONGOUSER;
  layout = LAYOUT;

  signupForm = this.fb.group({
    firstName: [ '', Validators.required ],
    lastName: [ '', Validators.required ],
    email: [ '', Validators.compose([ Validators.email, Validators.required ]) ],
    password: [ '', Validators.required ],
    confirmPassword: [ '', Validators.compose([ passwordMatcher, Validators.required ]) ]
  });

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  submitUser() {
    this.userService
      .createUser(MONGOUSER)
      .toPromise()
      .then(() => {
        this.layout.userConnected = true;
        this.router.navigate([ 'home' ]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

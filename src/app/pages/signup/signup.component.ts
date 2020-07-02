import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MONGOUSER } from '../../mocks/mongo-user.mock';
import { UserService } from '../../services/user.service';
import { LAYOUT } from '../../mocks/layout.mock';

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
    password: [ '', Validators.required ]
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

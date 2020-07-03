import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LAYOUT } from '../../mocks/layout.mock';
import { MONGOUSER } from '../../mocks/mongo-user.mock';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.scss' ]
})
export class SignupComponent implements OnInit {
  passwordVisibility = true;
  validation = false;
  layout = LAYOUT;
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: [ '', Validators.required ],
      lastName: [ '', Validators.required ],
      email: [ '', Validators.compose([ Validators.email, Validators.required ]), this.emailVerificator() ],
      password: [ '', Validators.required ],
      confirmPassword: [ '', Validators.compose([ Validators.required, this.passwordMatcher() ]) ]
    });
  }

  emailVerificator(): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      const response = await this.userService.verifyIfEmailIsAvailable(control.value);
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
    console.log(this.signupForm.value);
    MONGOUSER.email = this.signupForm.value.email;
    MONGOUSER.password = this.signupForm.value.password;
    MONGOUSER.firstName = this.signupForm.value.firstName;
    MONGOUSER.lastName = this.signupForm.value.lastName;
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

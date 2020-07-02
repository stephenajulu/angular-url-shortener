import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: [ './signup.component.scss' ]
})
export class SignupComponent {
  visibility = true;

  emailFormControl = new FormControl('', [ Validators.required, Validators.email ]);

  signupForm = this.fb.group({
    firstName: [ null, Validators.required ],
    lastName: [ null, Validators.required ],
    email: [ null, Validators.required, Validators.email ],
    password: [ null, Validators.required ]
  });

  constructor(private fb: FormBuilder) {}

  onSubmit() {}
}

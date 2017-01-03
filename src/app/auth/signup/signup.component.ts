import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire, FirebaseApp } from 'angularfire2';
import { Logger } from '../../shared/logger.service';

@Component({
  templateUrl: './signup.view.html'
})

export class SignupComponent {
	private logger: Logger;
  public error: any;

  constructor(
    private af: AngularFire,
    private router: Router,
    logger: Logger
  ) { this.logger = logger }

  onSubmit(formData) {
    if(formData.valid) {
      this.logger['log'](formData.value);
      this.af.auth.createUser({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
        this.logger['log'](success);
        this.router.navigate(['/login'])
      }).catch(
        (err) => {
        this.logger['log'](err);
        this.router.navigate(['/login']);
      })
    } else {
      this.error = 'Your form is invalid';
    }
  }
}

import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire, FirebaseApp } from 'angularfire2';
import { Logger } from '../../shared/logger.service';

@Component({
  templateUrl: './login.view.html'
})

export class LoginComponent {
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
      this.af.auth.login({
        email: formData.value.email,
        password: formData.value.password
      }).then(
        (success) => {
        this.logger['log'](success);
        this.router.navigate(['/dashboard']);
      }).catch(
        (err) => {
        this.logger['log'](err);
        this.router.navigate(['/dashboard']);
      })
    } else {
      this.error = 'Your form is invalid';
    }
  }
}

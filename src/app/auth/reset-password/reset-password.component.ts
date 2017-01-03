import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFire, FirebaseApp } from 'angularfire2';
import { Logger } from '../../shared/logger.service';

@Component({
  templateUrl: './reset-password.view.html'
})

export class ResetpassComponent {
	private logger: Logger;
  public auth: any;
  public message: any;

  constructor(
    private af: AngularFire,
    @Inject(FirebaseApp) firebaseApp: any,
    logger: Logger
  ) {
    this.logger = logger;
    this.auth = firebaseApp.auth();
    this.logger['log'](this.auth);
  }

  onSubmit(formData) {
     if(formData.valid) {
       this.logger['log']('Submission worked');
       this.auth.sendPasswordResetEmail(formData.value.email)
         .then( (response) => {
           this.logger['log']('Sent successfully');
           this.message = 'Check your email for reset link';
         })
         .catch( (error) => {
           this.message = error;
           this.logger['log'](error);
         })
     }
  }
}

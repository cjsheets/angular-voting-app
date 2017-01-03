import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

import { Logger } from '../shared/logger.service';

@Injectable()
export class AuthService {
  private loggedIn: boolean;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private af: AngularFire,
    private _log: Logger
  ) {
    this.af.auth.subscribe((auth) => this._log['log']( "AuthService: " + auth ));
  }

  login(): void {
    this.af.auth.login().then((success) => {
      this.loggedIn = true;
    }).catch((err) => {
      this.loggedIn = false;
      this._log['log']( "Error Logging In:" )
      this._log['warn']( err )
    });
  }

  logout(): void {
    this.af.auth.logout();
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    this.loggedIn = (this.af.auth) ? true : false;
    return this.loggedIn;
  }
}

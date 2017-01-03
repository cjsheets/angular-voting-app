import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, AuthProviders } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Logger } from '../shared/logger.service';

@Injectable()
export class AuthService {

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private af: AngularFire,
    private _log: Logger
  ) {
    this.af.auth.subscribe((auth) => this._log['log']( "AuthService: " + auth ));
  }

  login(provider = ''): void {
    var authProvider = {};
    switch (provider){
      case 'Google': authProvider = {provider: AuthProviders.Google}; break;
      case 'Github': authProvider = {provider: AuthProviders.Github}; break;
      case 'Facebook': authProvider = {provider: AuthProviders.Facebook}; break;
      case 'Twitter': authProvider = {provider: AuthProviders.Twitter}; break;
    }
    this._log['log']( "auth.service: login() - " + authProvider );
    this.af.auth.login(authProvider).then((success) => {
         
    }).catch((err) => {

      this._log['log']( "Error Logging In:" )
      this._log['warn']( err )
    });
  }

  logout(): void {
    this.af.auth.logout();
  }

}

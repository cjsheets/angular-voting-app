import { Injectable } from '@angular/core';
import { AngularFire,
  FirebaseListObservable,
  FirebaseAuthState,
  AuthMethods, AuthProviders } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Logger } from '../shared/logger.service';

@Injectable()
export class AuthService {

  // store the URL so we can redirect after logging in
  redirectUrl: string;
  authState: FirebaseAuthState;

  constructor(
    public af: AngularFire,
    private _log: Logger
  ) {
    this.af.auth.subscribe(auth => {
      this._log['log']( 'af.auth.subscribe():', auth );
      this.authState = auth
      if(this.authState == null){
        this.login();
      }
    });
  }

  login(provider = ''): void {
    this._log['log']( 'login(): ', provider );
    this.af.auth.login( this.getAuthProvider(provider)).then((success) => {
      this._log['log']( "Logged In: ", success )
    }).catch((err) => {
      this._log['warn']( "Error Logging In: ", err )
    });
  }

  logout(): void {
    this.af.auth.logout();
  }

  getUID(): string {
    this._log['log']( 'getUID():', this.authState );
    return this.authState.uid;
  }

  getAuthProvider(provider: string): {} {
    var authProvider = {method: AuthMethods.Redirect};
    switch (provider){
      case 'Google': authProvider['provider'] = AuthProviders.Google; break;
      case 'Github': authProvider['provider'] = AuthProviders.Github; break;
      case 'Facebook': authProvider['provider'] = AuthProviders.Facebook; break;
      case 'Twitter': authProvider['provider'] = AuthProviders.Twitter; break;
      default: return '{}';
    }
    return authProvider;
  }

  getAuthState(): boolean {
    return this.authState !== null;
  }

}

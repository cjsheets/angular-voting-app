import { Injectable } from '@angular/core';
import { AngularFire, FirebaseAuthState,
  FirebaseObjectObservable,
  AuthMethods, AuthProviders } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Logger } from '../shared/logger.service';
import { Router } from '@angular/router'
import { FirebaseDbService } from '../shared/firebase-db.service';

@Injectable()
export class AuthService {
  private authState: FirebaseAuthState;
  private userObj$: FirebaseObjectObservable<any>;

  constructor(
    public af: AngularFire,
    private _log: Logger,
    private _FireDb: FirebaseDbService,
    private router: Router
  ) {
    this.af.auth.subscribe(auth => {
      this._log['log']( "Auth State Updated: ", auth )
      this.authState = auth;
      if(!auth) this.login();
      if(!auth.anonymous) this.userObj$ = this._FireDb.getUser(this.authState.uid);
    });
  }

  login(provider = ''): void {
    this.af.auth.login( this.getAuthProvider(provider)).then((success) => {
      this._log['log']( "Logged In: ", success )
    }).catch((err) => {
      this._log['warn']( "Error Logging In: ", err )
    });
  }

  logout(): void {
    this.af.auth.logout();
    this.router.navigate(['']);
  }

  getUID(): string {
    //this._log['log']( 'getUID():', this.authState );
    return this.authState.uid;
  }

  getUserName(): string {
    //this._log['log']( 'getUserName():', this.authState.auth );
    return this.authState.auth.displayName || '';

  }

  getUserPhoto(){
    return this.authState.auth.photoURL || '';
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

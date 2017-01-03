import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Logger } from '../shared/logger.service';

@Injectable()
export class AuthService {
  private loggedIn = new Subject<boolean>();

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
       this.loggedIn.next( true );
    }).catch((err) => {
      this.loggedIn.next( false );
      this._log['log']( "Error Logging In:" )
      this._log['warn']( err )
    });
  }

  logout(): void {
    this.loggedIn.next( false );
    this.af.auth.logout();
  }

    isLoggedIn(): Observable<any> {
      // return observable to be notified of status updates (login/logout)
      return this.loggedIn.asObservable();
    }

}

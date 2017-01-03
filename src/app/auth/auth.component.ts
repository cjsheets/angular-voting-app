import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { AuthService } from './auth.service';

import { Logger } from '../shared/logger.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.view.html',
})

export class AuthComponent implements OnInit {
 
  constructor(
    private af: AngularFire,
    private _auth: AuthService,
    private _log: Logger
  ) {}

  login() {
    this._auth.login();
    //this.af.auth.login();
  }

  logout() {
    this._auth.logout();
     //this.af.auth.logout();
  }

  ngOnInit(): void {
    //this._log['log']( "AuthComponent Init: " + this._auth.isLoggedIn() );
  }
 }

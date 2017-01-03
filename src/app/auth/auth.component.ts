import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { AuthService } from './auth.service';

import { Logger } from '../shared/logger.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.view.html',
  styleUrls: ['./auth.view.css']
})

export class AuthComponent implements OnInit {
 
  constructor(
    private af: AngularFire,
    private _auth: AuthService,
    private _log: Logger
  ) {}

  // login(provider = '{}') {
  //   this._auth.login(provider);
  // }

  // logout() {
  //   this._auth.logout();
  // }

  ngOnInit(): void {
    //this._log['log']( "AuthComponent Init: " + this._auth.isLoggedIn() );
  }
 }

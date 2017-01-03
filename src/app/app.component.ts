import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { Logger } from './shared/logger.service';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  private loggedIn = new Subject<boolean>();

  constructor(
    private _auth: AuthService,
    private _log: Logger
  ) {}

  // login() {
  //   this.af.auth.login();
  // }

  // logout() {
  //    this.af.auth.logout();
  // }

  ngOnInit(): void {
    this._auth.isLoggedIn().subscribe(loggedIn => this.loggedIn = loggedIn);
  }

}

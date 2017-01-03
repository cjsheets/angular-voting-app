import { Component } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { Logger } from './shared/logger.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
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

}

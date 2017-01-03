import { Component } from '@angular/core';

import { AuthService } from './auth/auth.service';
import { Logger } from './shared/logger.service';

import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.view.html',
  styleUrls: ['./app.view.css']
})
export class AppComponent {
  title = 'app works!';

  constructor(
    private _auth: AuthService,
    private _log: Logger
  ) {}


}

import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { AuthService } from './auth/auth.service';
import { Logger } from './shared/logger.service';

import { Subject } from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.view.html',
  styleUrls: ['./app.view.css']
})
export class AppComponent implements OnInit {
  items: FirebaseListObservable<any>;

  constructor(
    private af: AngularFire,
    private _auth: AuthService,
    private _log: Logger
  ) {}


  ngOnInit(): void {
    this.items = this.af.database.list('/voteApp/polls');
  }
    

}

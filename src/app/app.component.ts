import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { AuthService } from './navbar/auth.service';
import { Logger } from './shared/logger.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.view.html',
  styleUrls: ['./app.view.css']
})
export class AppComponent implements OnInit {

  constructor(
    private af: AngularFire,
    private _auth: AuthService,
    private _log: Logger
  ) {}


  ngOnInit(): void {
    
  }
    

}

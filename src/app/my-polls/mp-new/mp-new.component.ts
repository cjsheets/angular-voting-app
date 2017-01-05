import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Logger } from '../../shared/logger.service';

@Component({
  selector: 'mp-new',
  templateUrl: './mp-new.view.html',
  styleUrls: ['./mp-new.view.css'],
})
export class MyPollsNewComponent { 
  items: FirebaseListObservable<any>;

  constructor(
    private af: AngularFire,
    private _log: Logger
  ) {}


  ngOnInit(): void {
    this.items = this.af.database.list('/voteApp/polls');
  }
}
import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../auth/auth.service';
import { Subscription }   from 'rxjs/Subscription';

import { Logger } from '../../shared/logger.service';
import { MyPollsService } from '../my-polls.service';

@Component({
  selector: 'mp-grid',
  templateUrl: './mp-grid.view.html',
  styleUrls: ['./mp-grid.view.css'],
})
export class MyPollsGridComponent implements OnInit { 
  private myPolls$: FirebaseListObservable<any>;
  private bricks: Array<{}>;
  private subs: Subscription[] = [];

  constructor(
    private _log: Logger,
    private _mpS: MyPollsService,
    private _auth: AuthService
  ) {}


  ngOnInit(): void {
    this.subs[this.subs.length] = this._auth.af.auth.subscribe(auth => {
      if(auth) {
        this.myPolls$ = this._mpS.getPolls(this._auth.getUID());
        this.setupPolls();
      }
    });
  }

  setupPolls(): void {
    this.subs[this.subs.length] = this.myPolls$.subscribe(polls => {
      this.bricks = [];
      this._log['log'](polls)
      polls.forEach(poll => {
        // Base64 Encode for minor obscurification
        poll.key = btoa(poll.results);
        this.bricks.push(poll)
      });
    });
  }

  deletePoll(id): void {
      this._log['log']( 'delete this poll', id )
  }
  
  ngOnDestroy() {
    for(let sub of this.subs) sub.unsubscribe();
  }
}
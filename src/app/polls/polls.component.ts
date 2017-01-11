import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Subscription }   from 'rxjs/Subscription';

import { Logger } from '../shared/logger.service';
import { FirebaseDbService } from '../firebase-db.service';

@Component({
  selector: 'polls',
  templateUrl: './polls.view.html',
  styleUrls: ['./polls.view.css'],
})
export class PollsComponent implements OnInit { 
  private publicPolls$: FirebaseListObservable<any>;
  private bricks: Array<{}>;
  private subs: Subscription[] = [];

  constructor(
    private _log: Logger,
    private _ppS: FirebaseDbService
  ) {}


  ngOnInit(): void {
    this._log['log']('PollsComponent :: ngOnInit()')
    this.publicPolls$ = this._ppS.getPolls();
    this.setupPolls();
  }

  setupPolls(): void {
    this.subs[this.subs.length] = this.publicPolls$.subscribe(polls => {
      this.bricks = [];
      this._log['log'](polls)
      polls.forEach(poll => {
        // Base64 Encode for minor obscurification
        poll.key = btoa(poll.results);
        this.bricks.push(poll)
      });
    });
  }
  
  ngOnDestroy() {
    for(let sub of this.subs) sub.unsubscribe();
  }
}
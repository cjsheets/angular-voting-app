import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Subscription }   from 'rxjs/Subscription';

import { Logger } from '../../shared/logger.service';
import { PublicPollsService } from '../public-polls.service';

@Component({
  selector: 'pp-grid',
  templateUrl: './pp-grid.view.html',
  styleUrls: ['./pp-grid.view.css'],
})
export class PublicPollsGridComponent implements OnInit { 
  private publicPolls: FirebaseListObservable<any>;
  private bricks: Array<{}>;
  subscription: Subscription;

  constructor(
    private _log: Logger,
    private _ppS: PublicPollsService
  ) {}


  ngOnInit(): void {
    this.publicPolls = this._ppS.getPolls();
    this.setupPolls();
  }

  setupPolls(): void {
    this.subscription = this.publicPolls.subscribe(polls => {
      this.bricks = [];
      this._log['log'](polls)
      polls.forEach(poll => {
        // Base64 Encode for minor obscurification
        poll.key = btoa(poll.results);
        this.bricks.push(poll)
      });
    });
  }

  vote() {
    
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
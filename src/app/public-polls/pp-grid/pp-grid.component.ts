import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Logger } from '../../shared/logger.service';

@Component({
  selector: 'pp-grid',
  templateUrl: './pp-grid.view.html',
  styleUrls: ['./pp-grid.view.css'],
})
export class PublicPollsGridComponent implements OnInit { 
  private fbPolls: FirebaseListObservable<any>;
  private bricks: Array<{}>;

  constructor(
    private af: AngularFire,
    private _log: Logger
  ) {}


  ngOnInit(): void {
    this.fbPolls = this.af.database.list('/voteApp/polls', {query: {limitToLast: 20}});
    this.setupPolls();
  }

  setupPolls(): void {
    this.fbPolls.subscribe(polls => {
      this.bricks = [];
      polls.forEach(poll => this.bricks.push(poll));
    });
  }
    // this.bricks = [
    //   {title: 'Brick 1'},
    //   {title: 'Brick 2'},
    //   {title: 'Brick 3'},
    //   {title: 'Brick 4'},
    //   {title: 'Brick 5'},
    //   {title: 'Brick 6'}
    // ]

}
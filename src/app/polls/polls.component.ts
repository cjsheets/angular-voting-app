import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Subscription }   from 'rxjs/Subscription';
import { AuthService } from '../navbar/auth.service';

import { Logger } from '../shared/logger.service';
import { FirebaseDbService } from '../firebase-db.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'polls',
  templateUrl: './polls.view.html',
  styleUrls: ['./polls.view.css'],
})
export class PollsComponent implements OnInit { 
  private currentRoute: string;
  private publicPolls$: FirebaseListObservable<any>;
  private myPolls$: FirebaseListObservable<any>;
  private bricks: Array<{}>;
  private subs: Subscription[] = [];

  constructor(
    private _log: Logger,
    private _FireDb: FirebaseDbService,
    private _auth: AuthService,
    private route: ActivatedRoute
  ) {}


  ngOnInit(): void {
    this.subs[this.subs.length] = this.route.url.subscribe(url => {
      this.currentRoute = url[0].path;

      if(this.currentRoute == 'polls'){
        this._log['log']('PollsComponent :: ngOnInit()')
        this.publicPolls$ = this._FireDb.getPolls();
        this.setupPolls();

      } else { // Route: my-polls
        this.subs[this.subs.length] = this._auth.af.auth.subscribe(auth => {
          if(auth) {
            this.myPolls$ = this._FireDb.getMyPolls(this._auth.getUID());
            this.setupMyPolls();
          }
        });
      }
    });
  }

  setupPolls(): void {
    this.subs[this.subs.length] = this.publicPolls$.subscribe(polls => {
      this.bricks = [];
      this._log['log'](polls)
      polls.forEach(poll => {
        // Base64 Encode for minor obscurification
        poll.rKey = btoa(poll.results);
        this.bricks.push(poll)
      });
    });
  }

  setupMyPolls(): void {
    this.subs[this.subs.length] = this.myPolls$.subscribe(polls => {
      this.bricks = [];
      this._log['log'](polls)
      polls.forEach(poll => {
        //this._log['log']('poll: ', poll);
        // Base64 Encode for minor obscurification
        poll.pKey = btoa(poll.$key);
        poll.rKey = btoa(poll.results);
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
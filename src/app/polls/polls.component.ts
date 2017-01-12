import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable,
  FirebaseObjectObservable } from 'angularfire2';
import { Subscription }   from 'rxjs/Subscription';
import { AuthService } from '../navbar/auth.service';

import { Logger } from '../shared/logger.service';
import { FirebaseDbService } from '../shared/firebase-db.service';
import { ActivatedRoute } from '@angular/router';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'polls',
  templateUrl: './polls.view.html'
})
export class PollsComponent implements OnInit { 
  private currentRoute: string;
  private pollList$: FirebaseListObservable<any>;
  private myPollList$: FirebaseListObservable<any>;
  private myResultObj$: FirebaseObjectObservable<any>;
  private bricks: Array<{}> = [];
  private subs: Subscription[] = [];

  private pollToDelete = '';

  constructor(
    private modalService: NgbModal,
    private _log: Logger,
    private _FireDb: FirebaseDbService,
    private _auth: AuthService,
    private route: ActivatedRoute,
  ) { }


  ngOnInit(): void {
    this.subs[this.subs.length] = this.route.url.subscribe(url => {
      this.currentRoute = url[0].path;

      if(this.currentRoute == 'polls'){
        //this._log['log']('PollsComponent :: ngOnInit()')
        this.pollList$ = this._FireDb.getPolls();
        this.setupPolls();

      } else { // Route: my-polls
        this.subs[this.subs.length] = this._auth.af.auth.subscribe(auth => {
          if(auth) {
            this.myPollList$ = this._FireDb.getMyPolls(this._auth.getUID());
            this.setupMyPolls();
          }
        });
      }
    });
  }

  setupPolls(): void {
    this.subs[this.subs.length] = this.pollList$.subscribe(polls => {
      this.bricks = [];
      //this._log['log']('setupPolls(): ', polls)
      polls.forEach(poll => {
        // Base64 Encode for minor obscurification
        poll.rKey = btoa(poll.results);
        this.bricks.push(poll)
      });
    });
  }

  setupMyPolls(): void {
    this.subs[this.subs.length] = this.myPollList$.subscribe(polls => {
      this.bricks = [];
      //this._log['log']('setupMyPolls(): ', polls)
      polls.forEach(poll => {
        // Base64 Encode for minor obscurification
        poll.pKey = btoa(poll.$key);
        poll.rKey = btoa(poll.results);
        this.bricks.push(poll)
      });
    });
  }

  getResultHandle(resultID: string): void {
    this.myResultObj$ = this._FireDb.getResults(resultID);
  }

  open(content, question, resultID, pollID) {
    this._log['log']( "Open Modal: ", atob(resultID), atob(pollID) );
    this.pollToDelete = question;
    this.modalService.open(content).result.then((result) => {
      this.getResultHandle(atob(resultID));
      this.myResultObj$.remove();
      this.myPollList$.remove(atob(pollID));
    }, (reason) => {
      this._log['log']( "Dismissed, do nothing" );
    });
  }

  deleteConfirmation(){
      this._log['log']( 'popover' )

  }

  deletePoll(id): void {
      this._log['log']( 'delete this poll', id )
  }
  
  ngOnDestroy() {
    for(let sub of this.subs) sub.unsubscribe();
  }
}
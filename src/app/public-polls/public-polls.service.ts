import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Logger } from '../shared/logger.service';

import { Subject }    from 'rxjs/Subject';

@Injectable()
export class PublicPollsService {

  constructor(
    private af: AngularFire,
    private _log: Logger,
  ) {}

  getPolls(): FirebaseListObservable<any> {
    return this.af.database.list('/voteApp/polls', {query: {limitToLast: 20}});
  }

  getResults(id): FirebaseListObservable<any> {
    this._log['log'](id)
    return this.af.database.list('/voteApp/results', {query: {orderByChild: 'poll', equalTo: id}});
  }

  useService() {
    console.log('Service is working');
  }

}
import { Injectable } from '@angular/core';
import { AngularFire,
  FirebaseObjectObservable,
  FirebaseListObservable } from 'angularfire2';

import { Logger } from './logger.service';

@Injectable()
export class FirebaseDbService {

  constructor(
    private af: AngularFire,
    private _log: Logger,
  ) {}

  getPolls(): FirebaseListObservable<any> {
    this._log['log']('getPolls(), limit: 20');
    return this.af.database.list('/voteApp/polls', {query: {limitToLast: 20}});
  }

  getMyPolls(id): FirebaseListObservable<any> {
    this._log['log']('getMyPolls(), limit: 20, UID: ', id);
    return this.af.database.list('/voteApp/polls', {
      query: {limitToLast: 20, orderByChild: 'owner', equalTo: id}
    });
  }

  getPoll(id): FirebaseObjectObservable<any> {
    this._log['log']('getPoll(id): ' + id);
    return this.af.database.object('/voteApp/polls/' + id);
  }

  getResults(id): FirebaseObjectObservable<any> {
    this._log['log']('getResults(id): ' + id);
    return this.af.database.object('/voteApp/results/' + id);
  }
}
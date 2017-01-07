import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Logger } from '../shared/logger.service';

@Injectable()
export class PublicPollsService {
 
  constructor(
    private af: AngularFire,
    private _log: Logger,
  ) {}

  getPolls(): FirebaseListObservable<any> {
    return this.af.database.list('/voteApp/polls', {query: {limitToLast: 20}});
  }

  useService() {
    console.log('Service is working');
  }

}
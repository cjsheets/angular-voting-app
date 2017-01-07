import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Subscription }   from 'rxjs/Subscription';

import { Logger } from '../../shared/logger.service';
import { PublicPollsService } from '../public-polls.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'pp-vote',
  templateUrl: './pp-vote.view.html',
  styleUrls: ['./pp-vote.view.css'],
})
export class PublicPollsVoteComponent implements OnInit, OnDestroy {
  private pID: string;
  private results$: FirebaseListObservable<any>;
  private results;
  private options;
  subscription: Subscription;

  constructor(
    private _log: Logger,
    private _ppS: PublicPollsService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(params => { this.pID = atob(params['id']); });
  }


  ngOnInit(): void {
    this.results$ = this._ppS.getResults(this.pID);
    this.setupResults();
  }

  setupResults(): void {
    this.subscription = this.results$.subscribe(results => {
      this._log['log'](results);
      this.results = results;
      this.parseResults();
    });
    this._log['log'](this.results);
  }

  parseResults(){
    this.options = [];
    for(let option in this.results[0].options){
      this.options.push({option: option, votes: this.results[0].options[option]});
    }
    this._log['log'](this.options);
  }

  // Doughnut
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }
  
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
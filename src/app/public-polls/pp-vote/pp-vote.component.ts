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

  // Doughnut Chart
  public doughnutChartEmpty: boolean = true;
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string = 'doughnut';
  public doughnutChartOptions: any = {rotation: Math.random() * 6.28};

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
      this.updateChart();
    }
    this._log['log'](this.options);
  }

  updateChart(): void {
    this.doughnutChartEmpty = true;
    this.doughnutChartLabels = [];
    this.doughnutChartData = [];
    for(let object of this.options){
      this.doughnutChartLabels.push(object.option);
      this.doughnutChartData.push(object.votes);
      if(object.votes > 0){
        this.doughnutChartEmpty = false;
      }
    }
  }


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
import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';

import { Logger } from '../../shared/logger.service';
import { PublicPollsService } from '../public-polls.service';

import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'pp-vote',
  templateUrl: './pp-vote.view.html',
  styleUrls: ['./pp-vote.view.css'],
})
export class PublicPollsVoteComponent implements OnInit {
  private pID: string;
  private results$: FirebaseListObservable<any>;
  private results;
  private options: string[];

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
    this.results$.subscribe(results => {
      this._log['log'](results);
      this.results = results;
      this.parseResults();
    });
    this._log['log'](this.results);
  }

  parseResults(){
    this.options = [];
    for(let option in this.results[0].options){
      this.options.push(option);
    }
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

}
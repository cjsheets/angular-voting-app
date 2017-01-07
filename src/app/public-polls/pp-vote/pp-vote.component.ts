import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Subscription }   from 'rxjs/Subscription';

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

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
  public voteForm: FormGroup;

  // Doughnut Chart
  public doughnutChartEmpty: boolean = true;
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string = 'doughnut';
  public doughnutChartOptions: any = {rotation: Math.random() * 6.28};

  constructor(
    private _log: Logger,
    private _ppS: PublicPollsService,
    private _fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(params => { this.pID = atob(params['id']); });
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

  submitForm(model) {
    this._log['log']( model );
    // let polls = {
    //   owner: this._auth.getUID(),
    //   question: model.controls.question.value
    // }
    // let options = {};
    // for (let formGroup of model.controls.options.controls) {
    //   options[formGroup.value.option] = 0;
    // }
    // let promise = this.fbPolls.push(polls);
    // promise.then( res => {
    //   //this._log['log']( res );
    //   let results = {poll: res.key, options: options, voter: []};
    //   this.fbResults.push(results);
    //   //this._log['log']( results );
    // });
  }

  ngOnInit(): void {
    this.results$ = this._ppS.getResults(this.pID);
    this.setupResults();
    this.voteForm = this._fb.group({
      voteOption: ['', Validators.required]
    });
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirebaseObjectObservable } from 'angularfire2';
import { AuthService } from '../auth/auth.service';
import { Subscription }   from 'rxjs/Subscription';

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Logger } from '../shared/logger.service';
import { FirebaseDbService } from '../firebase-db.service';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vote',
  templateUrl: './vote.view.html',
  styleUrls: ['./vote.view.css'],
})
export class VoteComponent implements OnInit, OnDestroy {
  private pID: string;
  private results$: FirebaseObjectObservable<any>;
  private results;
  private options;
  private votes;
  private question;
  private alreadyVoted: string = '';
  private subs: Subscription[] = [];
  public voteForm: FormGroup;

  constructor(
    private _auth: AuthService,
    private _log: Logger,
    private _ppS: FirebaseDbService,
    private _fb: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.subs[this.subs.length] = route.params.subscribe(params => { 
      this.pID = atob(params['id']);
    });
  }

  ngOnInit(): void {
    this.results$ = this._ppS.getResults(this.pID);
    this.setupResults();
    this.voteForm = this._fb.group({
      voteOption: ['', Validators.required]
    });
  }

  setupResults(): void {
    this.subs[this.subs.length] = this.results$.subscribe(results => {
      this._log['log'](results);
      this.results = results;
      this.parseResults();
    });
    this._log['log'](this.results);
  }

  parseResults(){
    this.options = [];
    this.question = this.results.question;
    this.votes = this.results.votes || {};
    let i = 0; // <input type="radio"> return value
    if(this.votes[this._auth.getUID()]){
      this.alreadyVoted = this.votes[this._auth.getUID()];
    }
    for(let option in this.results.options){
      this.options.push({option: option, votes: this.results.options[option], i: i});
      i++;
    }
    this.updateChart();
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


  // Doughnut Chart
  public doughnutChartEmpty: boolean = true;
  public doughnutChartLabels: string[] = [];
  public doughnutChartData: number[] = [];
  public doughnutChartType: string = 'doughnut';
  public doughnutChartOptions: any = {rotation: Math.random() * 6.28};

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }

  submitForm(model) {
    this._log['log']( model );
    var newVoteTotal = {}, votedFor = '';
    for(let o of this.options) if(model.controls.voteOption.value == o.i) {
      newVoteTotal[o.option] = o.votes + 1;
      votedFor = o.option;
    } else {
      newVoteTotal[o.option] = o.votes;
    }
    this._log['log']( {'options': newVoteTotal} );
    let votes = this.votes;
    votes[this._auth.getUID()] = votedFor;
    let promise = this.results$.update({options: newVoteTotal, votes: votes});
  }
  
  ngOnDestroy() {
    for(let sub of this.subs) sub.unsubscribe();
  }
}
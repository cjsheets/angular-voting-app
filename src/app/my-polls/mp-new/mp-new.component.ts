import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Logger } from '../../shared/logger.service';
import { Poll } from '../../shared/interface/poll.interface';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'mp-new',
  templateUrl: './mp-new.view.html',
  styleUrls: ['./mp-new.view.css'],
})
export class MyPollsNewComponent implements OnInit, OnDestroy { 
  private pID: string;  // Poll ID
  private fbPolls: FirebaseListObservable<any>;
  private fbResults: FirebaseListObservable<any>;
  public newPollForm: FormGroup;
  private subs: Subscription[] = [];

  //poll = new Poll( this._auth.getUID(), [], '', []);

  constructor(
    private af: AngularFire,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _log: Logger,
    private route: ActivatedRoute
  ) {
    this.subs[this.subs.length] = route.params.subscribe(params => {
      this.pID = atob(params['id']);
    });
  }


  ngOnInit(): void {
    this.fbPolls = this.af.database.list('/voteApp/polls', {query: {limitToLast: 1}});
    this.fbResults = this.af.database.list('/voteApp/results', {query: {limitToLast: 1}});
    //this.fbPolls = this.af.database.list('/voteApp/polls');
    this.newPollForm = this._fb.group({
      question: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]],
      options: this._fb.array([
        this.initOptions(),
        this.initOptions()
      ])
    });
  }

  logFormState(): void {
    this._log['log']( 'Form State (mp-new.component): ' );
    //this._log['log']( this.poll );
  }

  initOptions() {
    return this._fb.group({
      option: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(200)]],
      votes: [0, Validators.required]
    });
  }

  addOption() {
    const control = <FormArray>this.newPollForm.controls['options'];
    control.push(this.initOptions());
  }

  removeOption(i: number) {
    const control = <FormArray>this.newPollForm.controls['options'];
    control.removeAt(i);
  }

  save(model) {
    let options = {};
    for (let formGroup of model.controls.options.controls) options[formGroup.value.option] = 0;
    let results = {options: options, question: model.controls.question.value};
    let promise = this.fbResults.push(results);
    promise.then( res => {
      //this._log['log']( res );
      let polls = {
        owner: this._auth.getUID(),
        question: model.controls.question.value,
        results: res.key
      }
      this.fbPolls.push(polls);
      //this._log['log']( results );
    });
  }

  // Doughnut
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [1, 1, 1];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }
  
  ngOnDestroy() {
    for(let sub of this.subs) sub.unsubscribe();
  }
}
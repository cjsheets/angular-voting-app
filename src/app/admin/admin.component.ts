import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../navbar/auth.service';
import { AngularFire,
  FirebaseListObservable,
  FirebaseObjectObservable } from 'angularfire2';

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Logger } from '../shared/logger.service';
import { FirebaseDbService } from '../shared/firebase-db.service';
import { Poll } from '../shared/interface/poll.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'admin',
  templateUrl: './admin.view.html',
})
export class AdminComponent implements OnInit, OnDestroy { 
  private recordID = {};  // {poll: .., result: ..}
  private currentRoute: string;
  private pollList$: FirebaseListObservable<any>;
  private resultList$: FirebaseListObservable<any>;
  private resultObj$: FirebaseObjectObservable<any>;
  private resultData: any;
  private minOptions: number = 2;
  public fbForm: FormGroup;
  private subs: Subscription[] = [];
  public chartEmpty: boolean = true;
  public chartLabels: string[] = [];
  public chartData: number[] = [];

  // .../edit
  private staticOptions: string[] = [];

  constructor(
    private af: AngularFire,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _log: Logger,
    private _FireDb: FirebaseDbService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subs[this.subs.length] = this.route.url.subscribe(url => {
      this.currentRoute = url[0].path;
      this.buildForm();
      if(this.currentRoute == 'edit') {
        this.getUrlParams();
        this.getPollData();
      } else {
        this.getPollList();
        this.addOption();
        this.initChart(true);
      }
    });    
  }

  getUrlParams(): void {
    this.subs[this.subs.length] = this.route.params.subscribe(params => {
      this.recordID['poll'] = atob(params['pid']);
      this.recordID['result'] = atob(params['rid']);
      //this._log['log']( 'getUrlParams(): ', params, this.recordID );
    });
  }

  getPollList(): void { // This should be done by FireDb
    this.pollList$ = this.af.database.list('/voteApp/polls', {query: {limitToLast: 1}});
    this.resultList$ = this.af.database.list('/voteApp/results', {query: {limitToLast: 1}});
  }

  getPollData(): void {
    this.resultObj$ = this._FireDb.getResults(this.recordID['result']);
    this.subs[this.subs.length] = this.resultObj$.subscribe(results => {
      this.resultData = results;
      this.fbForm.patchValue({
        question: this.resultData.question
      })
      this.fbForm.get('question').disable();
      for(let option in this.resultData.options) this.staticOptions.push(option);
      this.initChart(false);
      this.minOptions = 1;
      //this._log['log']( 'getPollData(): ', this.resultData );
    });
  }

  initChart(chartIsEmpty: boolean): void {
    this.chartEmpty = chartIsEmpty;
    this.chartLabels = [];
    this.chartData = [];
    for(let option of this.staticOptions){
      this.chartLabels.push(option);
      this.chartData.push(1);
    }
    //this._log['log']( 'initChart(): ', this.staticOptions );
  }

  updateChart(formOptions): void {
    this.chartLabels = [];
    this.chartData = [];
    for(let option of this.staticOptions){
      this.chartLabels.push(option);
      this.chartData.push(1);
    }
    for(let formOption of formOptions){
      if(formOption.option){
        this._log['log']( 'updateChart(): ', formOption.option );
        this.chartLabels.push(formOption.option);
        this.chartData.push(1);
        this.chartEmpty = false;
      }
    }
  }
  
  buildForm() {
    this.fbForm = this._fb.group({
      question: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(72)]],
      options: this._fb.array([
        this.initOptions()
      ])
    });
    this.fbForm.valueChanges.subscribe(data => {
      this.updateChart(data.options);
    });
  }

  initOptions() {
    return this._fb.group({
      option: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(72)]],
      votes: [0, Validators.required]
    });
  }
  
  addOption() {
    const control = <FormArray>this.fbForm.controls['options'];
    control.push(this.initOptions());
  }

  removeOption(i: number) {
    const control = <FormArray>this.fbForm.controls['options'];
    control.removeAt(i);
  }

  save(model) {
    let options = {}, results = {};
    for (let formGroup of model.controls.options.controls) options[formGroup.value.option] = 0;
    if(this.currentRoute == 'edit'){
      let allOptions = Object.assign(options, this.resultData.options);
      results = {options: allOptions, question: this.resultData.question};
      let promise = this.resultObj$.update({options: allOptions});
    } else {
      results = {options: options, question: model.controls.question.value};
      let promise = this.resultList$.push(results);
      promise.then( res => {
        let polls = {
          owner: this._auth.getUID(),
          question: model.controls.question.value,
          results: res.key
        }
        this.pollList$.push(polls);
      });
    }
    this.router.navigate(['/my-polls']);
    //this._log['log']( 'save(): ', options, results );
  }
  
  ngOnDestroy() {
    for(let sub of this.subs) sub.unsubscribe();
  }
}
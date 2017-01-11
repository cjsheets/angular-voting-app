import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../navbar/auth.service';
import { AngularFire,
  FirebaseListObservable,
  FirebaseObjectObservable } from 'angularfire2';

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Logger } from '../shared/logger.service';
import { FirebaseDbService } from '../shared/firebase-db.service';
import { Poll } from '../shared/interface/poll.interface';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'admin',
  templateUrl: './admin.view.html',
  styleUrls: ['./admin.view.css'],
})
export class AdminComponent implements OnInit, OnDestroy { 
  private id = {};  // {poll: .., result: ..}
  private currentRoute: string;
  private pollList$: FirebaseListObservable<any>;
  private resultList$: FirebaseListObservable<any>;
  private result$: FirebaseObjectObservable<any>;
  private resultData: any;
  private staticOptions: string[] = [];
  private minOptions: number = 2;
  public newPollForm: FormGroup;
  private subs: Subscription[] = [];
  public chartEmpty: boolean = true;
  public chartLabels: string[] = [];
  public chartData: number[] = [];

  constructor(
    private af: AngularFire,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _log: Logger,
    private _mpS: FirebaseDbService,
    private route: ActivatedRoute
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
      }
    });    
  }

  getUrlParams(): void {
    this.subs[this.subs.length] = this.route.params.subscribe(params => {
      this.id['poll'] = atob(params['pid']);
      this.id['result'] = atob(params['rid']);
      this._log['log']( 'route.params: ', params, this.id );
    });
  }

  getPollList(): void {
    this.pollList$ = this.af.database.list('/voteApp/polls', {query: {limitToLast: 1}});
    this.resultList$ = this.af.database.list('/voteApp/results', {query: {limitToLast: 1}});
  }

  getPollData(): void {
    this.result$ = this._mpS.getResults(this.id['result']);
    this.subs[this.subs.length] = this.result$.subscribe(results => {
      this.resultData = results;
      this.newPollForm.patchValue({
        question: this.resultData.question
      })
      this.newPollForm.get('question').disable();
      for(let option in this.resultData.options) this.staticOptions.push(option);
      this.initChart();
      this.minOptions = 1;
      this._log['log']( 'getPollData(): ', this.resultData );
    });
  }

  initChart(): void {
    this.chartEmpty = false;
    this.chartLabels = [];
    this.chartData = [];
    for(let option of this.staticOptions){
      this.chartLabels.push(option);
      this.chartData.push(1);
    }
  }
  
  buildForm() {
    this.newPollForm = this._fb.group({
      question: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]],
      options: this._fb.array([
        this.initOptions()
      ])
    });
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
    let options = {}, results = {};
    for (let formGroup of model.controls.options.controls) options[formGroup.value.option] = 0;
    if(this.currentRoute == 'edit'){
      let allOptions = Object.assign(options, this.resultData.options);
      results = {options: allOptions, question: this.resultData.question};
      let promise = this.result$.update({options: allOptions});
    } else {
      results = {options: options, question: model.controls.question.value};
      let promise = this.resultList$.push(results);
      promise.then( res => {
        this._log['log']( res );
        let polls = {
          owner: this._auth.getUID(),
          question: model.controls.question.value,
          results: res.key
        }
        this.pollList$.push(polls);
        //this._log['log']( results );
      });
    }
    this._log['log']( options, results );
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
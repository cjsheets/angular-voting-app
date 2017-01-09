import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { DisableFormControlDirective } from '../../shared/disable-fc.directive';
import { Logger } from '../../shared/logger.service';
import { MyPollsService } from '../my-polls.service';
import { Poll } from '../../shared/interface/poll.interface';
import { ActivatedRoute } from '@angular/router';
import { Subscription }   from 'rxjs/Subscription';

@Component({
  selector: 'mp-new',
  templateUrl: './mp-new.view.html',
  styleUrls: ['./mp-new.view.css'],
})
export class MyPollsNewComponent implements OnInit, OnDestroy { 
  private id = {};  // {poll: .., result: ..}
  private currentRoute: string;
  private results$: FirebaseObjectObservable<any>;
  private resultData: any;
  private staticOptions: string[] = [];
  public newPollForm: FormGroup;
  private subs: Subscription[] = [];

  constructor(
    private af: AngularFire,
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _log: Logger,
    private _mpS: MyPollsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.subs[this.subs.length] = this.route.url.subscribe(url => {
      this.currentRoute = url[0].path;
      if(this.currentRoute == 'edit') {
        this.getUrlParams();
        this.getPollData();
      }
      this.buildForm();
    });    
  }

  getUrlParams(): void {
    this.subs[this.subs.length] = this.route.params.subscribe(params => {
      this.id['poll'] = atob(params['pid']);
      this.id['result'] = atob(params['rid']);
      this._log['log']( 'route.params: ', params, this.id );
    });
  }

  getPollData(): void {
    this.results$ = this._mpS.getResults(this.id['result']);
    this.subs[this.subs.length] = this.results$.subscribe(results => {
      this.resultData = results;
      this.newPollForm.patchValue({
        question: this.resultData.question
      })
      this.newPollForm.get('question').disable();
      for(let option in this.resultData.options) this.staticOptions.push(option);
      this._log['log']( 'getPollData(): ', this.resultData );
    });
  }
  
  buildForm() {
    this.newPollForm = this._fb.group({
      question: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(200)]],
      options: this._fb.array([
        this.initOptions(),
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
    // let options = {};
    // for (let formGroup of model.controls.options.controls) options[formGroup.value.option] = 0;
    // let results = {options: options, question: model.controls.question.value};
    // let promise = this.fbResults.push(results);
    // promise.then( res => {
    //   //this._log['log']( res );
    //   let polls = {
    //     owner: this._auth.getUID(),
    //     question: model.controls.question.value,
    //     results: res.key
    //   }
    //   this.fbPolls.push(polls);
    //   //this._log['log']( results );
    // });
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
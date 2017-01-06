import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

import { Validators, FormGroup, FormArray, FormBuilder } from '@angular/forms';

import { Logger } from '../../shared/logger.service';
import { Poll } from '../../shared/interface/poll.interface';

@Component({
  selector: 'mp-new',
  templateUrl: './mp-new.view.html',
  styleUrls: ['./mp-new.view.css'],
})
export class MyPollsNewComponent implements OnInit { 
  private items: FirebaseListObservable<any>;
  public newPollForm: FormGroup;

  //poll = new Poll( this._auth.getUID(), [], '', []);

  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _log: Logger
  ) {}


  ngOnInit(): void {
    //this.items = this.af.database.list('/voteApp/polls');
    //this.items.push({owner: 'me'});
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

  save(model: Poll) {
    this._log['log']( model );
  }


  // Doughnut
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [1, 1, 1];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
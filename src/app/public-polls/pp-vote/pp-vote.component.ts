import { Component } from '@angular/core';

import { Logger } from '../../shared/logger.service';
import { PublicPollsService } from '../public-polls.service';

import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'pp-vote',
  templateUrl: './pp-vote.view.html',
  styleUrls: ['./pp-vote.view.css'],
})
export class PublicPollsVoteComponent {
  private pID: string;

  constructor(
    private _log: Logger,
    private _ppS: PublicPollsService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(params => { this.pID = atob(params['id']); });
    console.log(this.pID);
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
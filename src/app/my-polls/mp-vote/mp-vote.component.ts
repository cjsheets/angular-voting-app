import { Component } from '@angular/core';

@Component({
  selector: 'mp-vote',
  templateUrl: './mp-vote.view.html',
  styleUrls: ['./mp-vote.view.css'],
})
export class MyPollsVoteComponent { 
  // Doughnut
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [350, 450, 100];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

}
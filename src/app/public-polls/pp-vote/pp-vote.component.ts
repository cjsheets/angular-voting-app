import { Component } from '@angular/core';

@Component({
  selector: 'pp-vote',
  templateUrl: './pp-vote.view.html',
  styleUrls: ['./pp-vote.view.css'],
})
export class PublicPollsVoteComponent { 
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
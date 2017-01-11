import { Component, Input } from '@angular/core';
import { Logger } from '../logger.service';

@Component({
  selector: 'doughnut',
  templateUrl: './doughnut.view.html'
})
export class DoughnutComponent { 

  // Doughnut Chart
  @Input()doughnutChartLabels: string[] = [];
  @Input()doughnutChartData: number[] = [];
  public doughnutChartType: string = 'doughnut';
  public doughnutChartOptions: any = {rotation: Math.random() * 6.28};

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Logger } from '../logger.service';

@Component({
  selector: 'doughnut',
  templateUrl: './doughnut.view.html'
})
export class DoughnutComponent { 

  // Doughnut Chart
  @Input()doughnutChartLabels: string[] = [];
  @Input()doughnutChartData: number[] = [];
  @Input()doughnutChartAnimation: boolean = true;
  public doughnutChartType: string = 'doughnut';
  public doughnutChartOptions: any = {rotation: Math.random() * 6.28};

  ngOnInit(): void {
    if(!this.doughnutChartAnimation){
      this.doughnutChartOptions = {
        rotation: Math.random() * 6.28,
        animation: {
            animateRotate: false
        }
      };
    }  
  }

  // events
  public chartClicked(e:any):void {
    //console.log(e);
  }

  public chartHovered(e:any):void {
    //console.log(e);
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'pp-grid',
  templateUrl: './pp-grid.view.html',
  styleUrls: ['./pp-grid.view.css'],
})
export class PublicPollsGridComponent { 
   bricks = [
     {title: 'Brick 1'},
     {title: 'Brick 2'},
     {title: 'Brick 3'},
     {title: 'Brick 4'},
     {title: 'Brick 5'},
     {title: 'Brick 6'}
   ]
}
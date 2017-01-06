import { Component } from '@angular/core';

import { PublicPollsService } from './public-polls.service';

@Component({
  selector: 'public-polls',
  templateUrl: './public-polls.view.html',
  styleUrls: ['./public-polls.view.css'],
  providers: [PublicPollsService]
})
export class PublicPollsComponent { 

  constructor(
    private _ppS: PublicPollsService
  ) {}

}
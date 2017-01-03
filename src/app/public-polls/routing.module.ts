import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicPollsGridComponent } from './pp-grid/pp-grid.component';
import { PublicPollsVoteComponent } from './pp-vote/pp-vote.component';

// Save space in the root module, export components here
export const routedComponents = [
  PublicPollsGridComponent,
  PublicPollsVoteComponent
];

const routes: Routes = [
  { path: 'polls', component: PublicPollsGridComponent },
  { path: 'vote', component: PublicPollsVoteComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class PublicPollsRoutingModule { }
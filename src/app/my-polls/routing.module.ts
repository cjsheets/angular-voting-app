import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPollsGridComponent } from './mp-grid/mp-grid.component';
import { MyPollsVoteComponent } from './mp-vote/mp-vote.component';

// Save space in the root module, export components here
export const routedComponents = [
  MyPollsGridComponent,
  MyPollsVoteComponent
];

const routes: Routes = [
  { path: 'my-polls', component: MyPollsGridComponent },
  { path: 'edit', component: MyPollsVoteComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MyPollsRoutingModule { }
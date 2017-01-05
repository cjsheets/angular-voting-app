import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPollsGridComponent } from './mp-grid/mp-grid.component';
import { MyPollsNewComponent } from './mp-new/mp-new.component';
import { MyPollsVoteComponent } from './mp-vote/mp-vote.component';

// Save space in the root module, export components here
export const routedComponents = [
  MyPollsGridComponent,
  MyPollsNewComponent,
  MyPollsVoteComponent
];

const routes: Routes = [
  { path: 'my-polls', component: MyPollsGridComponent },
  { path: 'new', component: MyPollsNewComponent },
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
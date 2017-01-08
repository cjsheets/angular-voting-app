import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPollsGridComponent } from './mp-grid/mp-grid.component';
import { MyPollsNewComponent } from './mp-new/mp-new.component';

// Save space in the root module, export components here
export const routedComponents = [
  MyPollsGridComponent,
  MyPollsNewComponent,
];

const routes: Routes = [
  { path: 'my-polls', component: MyPollsGridComponent },
  { path: 'new', component: MyPollsNewComponent },
  { path: 'edit/:id', component: MyPollsNewComponent }
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
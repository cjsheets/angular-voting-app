import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { PollsComponent } from './polls/polls.component';
import { VoteComponent } from './vote/vote.component';

// Save space in the root module, export components here
export const routedComponents = [
  AppComponent,
  WelcomeComponent,
  PollsComponent,
  VoteComponent
];

const routes: Routes = [
  { path: 'polls', component: PollsComponent },
  { path: 'vote/:id', component: VoteComponent },
  { path: '', component: WelcomeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
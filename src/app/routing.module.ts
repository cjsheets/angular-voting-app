import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';

import { AdminComponent } from './admin/admin.component';
import { PollsComponent } from './polls/polls.component';
import { VoteComponent } from './vote/vote.component';

// Save space in the root module, export components here
export const routedComponents = [
  AppComponent,
  WelcomeComponent,
  PollsComponent,
  VoteComponent,
  AdminComponent
];

const routes: Routes = [
  { path: 'av/polls', component: PollsComponent },
  { path: 'av/my-polls', component: PollsComponent },
  { path: 'av/vote/:id', component: VoteComponent },
  { path: 'av/new', component: AdminComponent },
  { path: 'av/edit/:rid/:pid', component: AdminComponent },
  { path: 'av', component: WelcomeComponent },
  { path: '**', redirectTo: 'av', pathMatch: 'full' }
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
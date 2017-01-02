import { Component, NgModule } from '@angular/core';

import { VoteNavComponent } from './vote-nav.component';

import { SharedModule } from '../shared/shared.module';
import { VnLoginComponent } from './vn-login/vn-login.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    VoteNavComponent,
    VnLoginComponent
  ],
  exports: [
    VoteNavComponent
  ]
})
export class VoteNavModule { }


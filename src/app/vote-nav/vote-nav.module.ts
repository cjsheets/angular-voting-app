import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

import { VoteNavComponent } from './vote-nav.component';
import { VnLoginComponent } from './vn-login/vn-login.component';

@NgModule({
  imports: [
    SharedModule,
    AuthModule
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


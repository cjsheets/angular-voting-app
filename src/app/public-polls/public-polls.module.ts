import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

import { PublicPollsRoutingModule, routedComponents } from './routing.module';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    PublicPollsRoutingModule
  ],
  declarations: [
    routedComponents
  ]
})
export class PublicPollsModule { }


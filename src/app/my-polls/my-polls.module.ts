import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

import { MyPollsRoutingModule, routedComponents } from './routing.module';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    MyPollsRoutingModule
  ],
  declarations: [
    routedComponents
  ]
})
export class MyPollsModule { }


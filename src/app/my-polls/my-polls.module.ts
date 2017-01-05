import { NgModule } from '@angular/core';
import { MasonryModule } from 'angular2-masonry';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

import { MyPollsRoutingModule, routedComponents } from './routing.module';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    MyPollsRoutingModule,
    MasonryModule,
    ChartsModule
  ],
  declarations: [
    routedComponents
  ]
})
export class MyPollsModule { }


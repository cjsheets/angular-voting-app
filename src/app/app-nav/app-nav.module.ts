import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

import { AppNavComponent } from './app-nav.component';

import { AppNavRoutingModule, routedComponents } from './routing.module';

@NgModule({
  imports: [
    SharedModule,
    AuthModule,
    AppNavRoutingModule
  ],
  declarations: [
    routedComponents
  ],
  exports: [
    AppNavComponent
  ]
})
export class AppNavModule { }


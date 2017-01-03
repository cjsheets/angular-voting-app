import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

import { AppNavComponent } from './app-nav.component';
import { AnLoginComponent } from './an-login/an-login.component';

@NgModule({
  imports: [
    SharedModule,
    AuthModule
  ],
  declarations: [
    AppNavComponent,
    AnLoginComponent
  ],
  exports: [
    AppNavComponent
  ]
})
export class AppNavModule { }


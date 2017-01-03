import { NgModule } from '@angular/core';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { afConfig, afAuthConfig } from './firebase.credential';

import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';
import { AuthService } from './auth.service';

@NgModule({
  imports: [
    SharedModule,
    AngularFireModule.initializeApp(afConfig, afAuthConfig)
  ],
  exports : [
    AuthComponent
  ],
  declarations: [
    AuthComponent
  ],
  providers: [ 
    AuthService
  ]
})
export class AuthModule { }
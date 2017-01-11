import { NgModule } from '@angular/core';

import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';
import { afConfig, afAuthConfig } from './firebase.credential';

import { SharedModule } from '../shared/shared.module';

import { SocialAuthComponent } from './social-auth/social-auth.component';
import { AuthService } from './auth.service';

import { NavbarComponent } from './navbar.component';

import { NavbarRoutingModule, routedComponents } from './routing.module';

@NgModule({
  imports: [
    SharedModule,
    NavbarRoutingModule,
    AngularFireModule.initializeApp(afConfig, afAuthConfig)
  ],
  declarations: [
    routedComponents
  ],
  exports: [
    SocialAuthComponent,
    NavbarComponent
  ],
  providers: [ 
    AuthService
  ]
})
export class NavbarModule { }


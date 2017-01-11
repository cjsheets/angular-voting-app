import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar.component';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { SocialAuthComponent } from './social-auth/social-auth.component';

// Save space in the root module, export components here
export const routedComponents = [
  NavbarComponent,
  LoginModalComponent,
  SocialAuthComponent
];

const routes: Routes = [
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class NavbarRoutingModule { }
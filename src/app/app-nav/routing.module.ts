import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppNavComponent } from './app-nav.component';
import { AnLoginComponent } from './an-login/an-login.component';

// Save space in the root module, export components here
export const routedComponents = [
  AppNavComponent,
  AnLoginComponent
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
export class AppNavRoutingModule { }
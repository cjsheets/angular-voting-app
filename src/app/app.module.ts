import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AppNavModule } from './app-nav/app-nav.module';
import { AppRoutingModule, routedComponents } from './routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    BrowserModule, FormsModule, HttpModule,
    AppNavModule,
    NgbModule.forRoot(),
    AppRoutingModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

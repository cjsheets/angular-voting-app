import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MasonryModule } from 'angular2-masonry';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { NavbarModule } from './navbar/navbar.module';
import { FirebaseDbService } from './shared/firebase-db.service';

import { AppRoutingModule, routedComponents } from './routing.module';

@NgModule({
  imports: [
    BrowserModule, FormsModule, HttpModule,
    NgbModule.forRoot(),
    NavbarModule,
    SharedModule,
    MasonryModule,
    AppRoutingModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [
    FirebaseDbService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

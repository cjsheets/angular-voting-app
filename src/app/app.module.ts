import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MasonryModule } from 'angular2-masonry';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { AppNavModule } from './app-nav/app-nav.module';

import { MyPollsModule } from './my-polls/my-polls.module';
import { AuthModule } from './auth/auth.module';
import { FirebaseDbService } from './firebase-db.service';

import { AppRoutingModule, routedComponents } from './routing.module';

@NgModule({
  imports: [
    BrowserModule, FormsModule, HttpModule,
    NgbModule.forRoot(),
    AuthModule,
    SharedModule,
    AppNavModule,
    MyPollsModule,
    MasonryModule,
    ChartsModule,
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

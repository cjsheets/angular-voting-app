import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppNavModule } from './app-nav/app-nav.module';

import { PublicPollsModule } from './public-polls/public-polls.module';
import { MyPollsModule } from './my-polls/my-polls.module';
import { AuthModule } from './auth/auth.module';

import { AppRoutingModule, routedComponents } from './routing.module';

@NgModule({
  imports: [
    BrowserModule, FormsModule, HttpModule,
    NgbModule.forRoot(),
    AppNavModule,
    PublicPollsModule,
    AuthModule,
    MyPollsModule,
    AppRoutingModule
  ],
  declarations: [
    routedComponents
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

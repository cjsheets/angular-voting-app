import { Component } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
  constructor(public af: AngularFire) {
  }

  login() {
    this.af.auth.login();
  }

  logout() {
     this.af.auth.logout();
  }
}

import { Component } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.view.html',
  styleUrls: ['./auth.view.css']
})

export class AuthComponent {
 
  constructor(private _auth: AuthService){}

}

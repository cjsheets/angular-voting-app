import { Component } from '@angular/core';

import { AuthService } from '../auth.service';

@Component({
  selector: 'social-auth',
  templateUrl: './social-auth.view.html',
  styleUrls: ['./social-auth.view.css']
})

export class SocialAuthComponent {
 
  constructor(private _auth: AuthService){}

}

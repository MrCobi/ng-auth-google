import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  auth = inject(AuthService);
  userData = JSON.parse(sessionStorage.getItem('loggedInUser')!);
  name = this.userData.name;
  givenName = this.userData.given_name;
  familyName = this.userData.family_name;
  userProfileimg = this.userData.picture;
  email = this.userData.email;
  emailVerified = this.userData.email_verified;
  
  constructor() { }

  ngOnInit() { }

  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.auth.signOut();
  }
}

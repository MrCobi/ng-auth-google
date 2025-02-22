import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
})
export class BrowseComponent implements OnInit {
  auth = inject(AuthService);
  name = JSON.parse(sessionStorage.getItem('loggedInUser')!).name;
  userProfileimg = JSON.parse(sessionStorage.getItem('loggedInUser')!).picture;
  email = JSON.parse(sessionStorage.getItem('loggedInUser')!).email;
  phone = JSON.parse(sessionStorage.getItem('loggedInUser')!).phone;
  address = JSON.parse(sessionStorage.getItem('loggedInUser')!).address;
  constructor() { }

  ngOnInit() {
  }

  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.auth.signOut();
  }

}

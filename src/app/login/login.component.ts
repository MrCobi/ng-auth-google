declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule],
  standalone: true
})
export class LoginComponent implements OnInit {
  private router = inject(Router);
  constructor() { }

  ngOnInit(): void {
    google.accounts.id.initialize({
      client_id: '353282839706-e755bvo698srturrrdjqbmv1r1ejhthk.apps.googleusercontent.com',
      callback: (response: any) => {
        this.handleLogin(response);
      }
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'outline',
      size: 'large',
      shape: 'pill',
      width: 280,
      logo_alignment: 'center',
      text: 'continue_with'
    });
  }

  private decodetoken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      const payload = this.decodetoken(response.credential);
      sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
      this.router.navigate(['browse']);
    }
  }
}

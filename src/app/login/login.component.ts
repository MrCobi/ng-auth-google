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
      theme: 'filled_blue',
      size: 'large',
      shape: 'rectangle',
      width: 350
    })
  }

  private decodetoken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  handleLogin(response: any) {
    if (response) {
      //decode token
      const payload = this.decodetoken(response.credential); 
      //guardarla en sesion
      sessionStorage.setItem('loggedInUser', JSON.stringify(payload));
      //navegar a home/
      this.router.navigate(['browse']);
    }
  }

}

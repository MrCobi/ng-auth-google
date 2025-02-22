declare var google: any;
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule],
  standalone: true
})


export class LoginComponent implements OnInit {
  private router = inject(Router);
  constructor(private userService: UserService) { }

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

      // Enviar los datos del usuario al backend
      this.userService.createUsuario(payload).subscribe({
        next: (res) => {
          console.log('✅ Usuario autenticado/registrado', res);
          sessionStorage.setItem('loggedInUser', JSON.stringify(res));
          this.router.navigate(['browse']); // ✅ Redirige después del login
        },
        error: (err) => {
          console.error('❌ Error al guardar/autenticar el usuario', err);
          alert('Hubo un problema con el login.');
        }
      });


    }
  }
}
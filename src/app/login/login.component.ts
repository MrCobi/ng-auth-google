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

  /**
   * Decodifica el token JWT y mapea los campos de snake_case a camelCase.
   *
   * @param token El token JWT.
   * @returns Un objeto con los datos del usuario en camelCase.
   */
  private decodetoken(token: string) {
    const rawPayload = JSON.parse(atob(token.split('.')[1]));
    return {
      ...rawPayload,
      emailVerified: rawPayload.email_verified, // Mapear snake_case a camelCase
      familyName: rawPayload.family_name || null,
      givenName: rawPayload.given_name || null,
      sub: rawPayload.sub,
      picture: rawPayload.picture,
      name: rawPayload.name
    };
  }

  /**
   * Maneja la respuesta de inicio de sesión de Google.
   *
   * @param response La respuesta de Google con el token JWT.
   */
  handleLogin(response: any) {
    if (response) {
      const payload = this.decodetoken(response.credential); // Decodificar y mapear el token
      sessionStorage.setItem('token', JSON.stringify(payload)); // Guardar token en sessionStorage

      this.userService.createUsuario(payload).subscribe({
        next: (res: any) => {
          // Almacenar datos del usuario y el estado existingUser
          sessionStorage.setItem('loggedInUser', JSON.stringify({
            ...res.user,
            existingUser: res.existingUser // Agregar esta propiedad
          }));
          this.router.navigate(['browse']);
        },
        error: (err) => {
          console.error('❌ Error al autenticar el usuario:', err);
          alert('Hubo un problema con el login.');
        }
      });
    }
  }
}
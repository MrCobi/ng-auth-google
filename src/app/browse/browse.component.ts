import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BrowseComponent implements OnInit {
  auth = inject(AuthService);
  userData = JSON.parse(sessionStorage.getItem('loggedInUser')!);
  name = this.userData.name;
  givenName = this.userData.givenName;
  familyName = this.userData.familyName;
  userProfileimg = this.userData.picture;
  email = this.userData.email;
  emailVerified = this.userData.emailVerified;
  existingUser = this.userData.existingUser; // Nueva propiedad

  // Mensaje condicional
  statusMessage = this.existingUser
    ? '⚠️ Ya existías. Sesión iniciada.'
    : '✅ ¡Bienvenido! Registro exitoso.';

  constructor() { }

  ngOnInit() {
    // Eliminar el estado existingUser después de usarlo (opcional)
    delete this.userData.existingUser;
    sessionStorage.setItem('loggedInUser', JSON.stringify(this.userData));
  }

  /**
   * Cierra la sesión del usuario.
   */
  signOut() {
    sessionStorage.removeItem('loggedInUser');
    this.auth.signOut();
  }
}
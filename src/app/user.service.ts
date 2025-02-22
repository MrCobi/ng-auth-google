import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8086/usuario'; // URL del backend

  constructor(private http: HttpClient) {}

  /**
   * Obtiene un usuario por su email.
   *
   * @param email El email del usuario.
   * @returns Un Observable con la respuesta del backend.
   */
  getUsuarioByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/byemail/${email}`);
  }

  /**
   * Obtiene un usuario por su ID.
   *
   * @param id El ID del usuario.
   * @returns Un Observable con la respuesta del backend.
   */
  getUsuarioById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea un nuevo usuario.
   *
   * @param usuario Los datos del usuario.
   * @returns Un Observable con la respuesta del backend.
   */
  createUsuario(usuario: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/new`, usuario, { headers });
  }
}